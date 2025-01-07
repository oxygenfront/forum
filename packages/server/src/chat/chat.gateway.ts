import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets'
import { PrismaService } from 'nestjs-prisma'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway(8080, {
	transports: ['websocket'],
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	},
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private readonly chatService: ChatService,
		private readonly prisma: PrismaService,
		private server: Server,
	) {}

	private users: Map<string, Socket> = new Map()

	afterInit(server: Server) {
		this.server = server
	}

	handleConnection(client: Socket) {
		try {
			// Извлечение userId и chatId из query
			const userId = client.handshake.query.userId as string
			const chatId = client.handshake.query.chatId as string

			if (!(userId && chatId)) {
				client.disconnect()
				return
			}

			// Сохраняем сокет клиента с его userId
			this.users.set(userId, client)

			// Присоединяем пользователя к чату
			client.join(chatId)

			// Отправляем все сообщения чата при подключении
			this.sendChatMessages(chatId, client)

			// Отправляем событие клиенту
			client.emit('connected', { userId })
		} catch (error) {
			console.error(`Error during connection: ${error.message}`)
			client.disconnect()
		}
	}

	handleDisconnect(client: Socket) {
		this.users.forEach((value, key) => {
			if (value === client) {
				this.users.delete(key)
			}
		})
	}

	async remove(id: string) {
		const repliesToRemove = await this.prisma.chatMessageReplies.findMany({
			where: { OR: [{ parentMessageId: id }, { childMessageId: id }] },
		})

		if (repliesToRemove.length) {
			await this.prisma.chatMessageReplies.deleteMany({
				where: { OR: [{ parentMessageId: id }, { childMessageId: id }] },
			})
		}

		return this.prisma.chatMessage.delete({
			where: { id },
		})
	}

	update(currentMessageId: string, updateMessage: string) {
		return this.prisma.chatMessage.update({
			where: { id: currentMessageId },
			data: { content: updateMessage },
		})
	}

	addUserToChat(chatId: string, userId: string) {
		return this.prisma.chatUser.create({
			data: {
				chatId,
				userId,
			},
		})
	}

	async removeUserFromChat(chatId: string, userId: string): Promise<void> {
		await this.prisma.chatUser.deleteMany({
			where: {
				chatId,
				userId,
			},
		})
	}

	@SubscribeMessage('addUserToChat')
	handleAddUserToChat(
		@MessageBody() data: {
			chatId: string
			userId: string
		},
	) {
		const { chatId, userId } = data
		return this.addUserToChat(chatId, userId)
	}

	@SubscribeMessage('removeUserFromChat')
	handleRemoveUserFromChat(
		@MessageBody() data: {
			chatId: string
			userId: string
		},
	): Promise<void> {
		const { chatId, userId } = data
		return this.removeUserFromChat(chatId, userId)
	}

	@SubscribeMessage('removeMessage')
	async handleRemoveMessage(
		@MessageBody() data: {
			id: string
			chatId: string
		},
	) {
		const { id, chatId } = data

		await this.remove(id)

		this.server.to(chatId).emit('messageRemoved', { id })
	}

	@SubscribeMessage('updateMessage')
	async handleUpdateMessage(
		@MessageBody() data: {
			chatId: string
			messageId: string
			content: string
		},
	) {
		const { messageId, content, chatId } = data

		// Обновляем сообщение
		await this.update(messageId, content)

		// Загружаем обновленное сообщение с необходимыми связями
		const updatedMessage = await this.prisma.chatMessage.findUnique({
			where: { id: messageId },
			include: {
				user: {
					select: {
						id: true,
						userLogin: true,
						userImage: true,
						avatarColor: true,
					},
				},
				respondedTo: {
					include: {
						parentMessage: {
							select: {
								id: true,
								content: true,
								user: {
									select: {
										id: true,
										userLogin: true,
									},
								},
							},
						},
					},
				},
			},
		})

		// Форматируем сообщение так же, как в sendChatMessages
		const formattedMessage = {
			...updatedMessage,
			respondedTo: updatedMessage.respondedTo.map((response) => ({
				id: response.parentMessageId,
				content: response.parentMessage?.content,
				user: response.parentMessage?.user,
			})),
		}

		// Уведомляем всех клиентов в чате о том, что сообщение обновлено
		this.server.to(chatId).emit('messageUpdated', formattedMessage)
	}

	@SubscribeMessage('joinChat')
	async handleJoinChat(
		@MessageBody() data: {
			userId: string
			chatId: string
		},
		@ConnectedSocket() client: Socket,
	) {
		const { userId, chatId } = data

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			client.emit('error', 'User not found')
			return
		}

		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: { users: true },
		})

		if (!chat?.users.some((user) => user.userId === userId)) {
			client.emit('error', 'User is not part of this chat')
			return
		}

		client.join(chatId)
		client.emit('joinedChat', chatId)

		// Отправляем все сообщения чата
		await this.sendChatMessages(chatId, client)
	}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(
		@MessageBody() data: {
			chatId: string
			content: string
			userId: string
			parentMessageId?: string[]
		},
		@ConnectedSocket() client: Socket,
	) {
		const { chatId, content, userId, parentMessageId } = data

		// Проверяем существование пользователя
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			client.emit('error', 'User not found')
			return
		}

		// Создаем новое сообщение
		const newMessage = await this.prisma.chatMessage.create({
			data: {
				chatId,
				userId: user.id,
				content,
			},
			include: {
				user: {
					select: {
						id: true,
						userLogin: true,
						userImage: true,
						avatarColor: true,
					},
				},
			},
		})

		// Если `parentMessageId` передан как массив, связываем все указанные сообщения
		if (parentMessageId && Array.isArray(parentMessageId)) {
			const parentLinks = parentMessageId.map((parentId) => ({
				parentMessageId: parentId,
				childMessageId: newMessage.id,
			}))

			await this.prisma.chatMessageReplies.createMany({
				data: parentLinks,
			})
		}

		// Загружаем сообщение с вложенной структурой
		const fullMessage = await this.prisma.chatMessage.findUnique({
			where: { id: newMessage.id },
			include: {
				user: {
					select: {
						id: true,
						userLogin: true,
						userImage: true,
						avatarColor: true,
					},
				},
				respondedTo: {
					include: {
						parentMessage: {
							select: {
								id: true,
								content: true,
								user: {
									select: {
										id: true,
										userLogin: true,
									},
								},
							},
						},
					},
				},
			},
		})

		// Отправляем новое сообщение всем пользователям в чате
		this.server.to(chatId).emit('newMessage', {
			...fullMessage,
			respondedTo: fullMessage.respondedTo.map((response) => ({
				id: response.parentMessageId,
				content: response.parentMessage?.content,
				user: response.parentMessage?.user,
			})),
		})
	}

	private async sendChatMessages(chatId: string, _client: Socket) {
		const chatMessages = await this.prisma.chatMessage.findMany({
			where: { chatId },
			include: {
				user: {
					select: {
						id: true,
						userLogin: true,
						userImage: true,
						avatarColor: true,
					},
				},
				respondedTo: {
					include: {
						parentMessage: {
							select: {
								id: true,
								content: true,
								user: {
									select: {
										id: true,
										userLogin: true,
									},
								},
							},
						},
					},
				},
			},
		})

		const formattedMessages = chatMessages.map((message) => ({
			...message,
			respondedTo: message.respondedTo.map((response) => ({
				id: response.parentMessageId,
				content: response.parentMessage?.content,
				user: response.parentMessage?.user,
			})),
		}))

		this.server.to(chatId).emit('chatMessages', formattedMessages)
	}
}
