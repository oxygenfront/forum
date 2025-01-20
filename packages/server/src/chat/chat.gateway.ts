import { Inject, forwardRef } from '@nestjs/common'
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
		@Inject(forwardRef(() => ChatService))
		private readonly chatService: ChatService,
		private readonly prisma: PrismaService,
		public server: Server,
	) {}

	public users: Map<string, Socket> = new Map()

	private async sendChatMessages(chatId: string) {
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

	/*private async getChat(id: string) {
		const chat = await this.prisma.chat.findUnique({
			where: { id },
			include: {
				chatMessages: {
					include: {
						user: {
							select: {
								id: true,
								avatarColor: true,
								userImage: true,
								userLogin: true,
							},
						},
						replies: {
							include: {
								childMessage: {
									select: {
										id: true,
										content: true,
										user: {
											select: {
												id: true,
												avatarColor: true,
												userImage: true,
												userLogin: true,
											},
										},
									},
								},
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
												avatarColor: true,
												userImage: true,
												userLogin: true,
											},
										},
									},
								},
							},
						},
					},
				},
				users: {
					select: {
						chatId: true,
						userId: true,
						user: {
							select: {
								id: true,
								avatarColor: true,
								userImage: true,
								userLogin: true,
							},
						},
					},
				},
				_count: {
					select: {
						users: true,
						chatMessages: true,
					},
				},
			},
		})

		if (!chat) {
			throw new Error('Chat not found')
		}

		return {
			chatMessages: chat.chatMessages,
			createdAt: chat.createdAt,
			creatorId: chat.creatorId,
			id: chat.id,
			title: chat.title,
			users: chat.users,
			usersCount: chat._count.users,
			messagesCount: chat._count.chatMessages,
			firstMessageDate: chat.chatMessages[0]?.createdAt,
			latestMessageDate: chat.chatMessages[chat.chatMessages.length - 1]?.createdAt,
		}
	}*/

	afterInit(server: Server) {
		this.server = server
	}

	async handleConnection(client: Socket) {
		try {
			const userId = client.handshake.query.userId as string
			const chatId = client.handshake.query.chatId as string | undefined // chatId может быть не определен

			if (!userId) {
				client.disconnect()
				return
			}

			if (chatId) {
				const chatUser = await this.prisma.chatUser.findUnique({
					where: {
						chatId_userId: {
							chatId: chatId,
							userId: userId,
						},
					},
				})

				if (!chatUser) {
					client.emit('error', { message: 'Пользователь не имеет доступа к чату', status: 403 })
					client.disconnect()
					return
				}

				// Подключаем к конкретному чату
				client.join(chatId)
				await this.sendChatMessages(chatId)
				client.emit('connected', { userId, chatId })

				const userChats = await this.chatService.getChatsForUser(userId)
				this.server.to(chatId).emit('updateChat', userChats)
			} else {
				client.emit('updateChat', await this.chatService.getChatsForUser(userId))
			}

			this.users.set(userId, client)
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

	async handleLeaveChat(client: Socket, userId: string, chatId: string) {
		try {
			if (!(userId && chatId)) {
				return
			}

			client.leave(chatId)

			await this.prisma.chatUser.delete({
				where: {
					chatId_userId: { chatId, userId },
				},
			})
			this.server.to(chatId).emit('leaveChat', { userId, chatId })
		} catch (error) {
			console.error(`Error during handleLeaveChat: ${error.message}`)
		}
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

	async addUserToChat(chatId: string, userId: string) {
		const chat = await this.chatService.getChat(chatId, userId)
		for (const userChatId of chat.users.map((u) => u.userId)) {
			const socket = this.users.get(userChatId)
			if (socket) {
				socket.emit('updateChat', await this.chatService.getChatsForUser(userChatId))
			}
		}
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
		const chat = await this.chatService.getChat(chatId, userId)
		for (const userChatId of chat.users.map((u) => u.userId)) {
			const socket = this.users.get(userChatId)
			if (socket) {
				socket.emit('updateChat', await this.chatService.getChatsForUser(userChatId))
			}
		}
	}

	@SubscribeMessage('updateChat')
	async handleUpdateChat(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
		const { userId } = data

		const userChats = await this.chatService.getChatsForUser(userId)
		client.emit('updateChat', userChats)
	}

	@SubscribeMessage('addUserToChat')
	async handleAddUserToChat(
		@MessageBody() data: {
			chatId: string
			userId: string
		},
	) {
		const { chatId, userId } = data
		this.server.to(chatId).emit('updateChat', await this.chatService.getChatsForUser(userId))
		await this.addUserToChat(chatId, userId)
	}

	@SubscribeMessage('removeUserFromChat')
	async handleRemoveUserFromChat(
		@MessageBody() data: {
			chatId: string
			userId: string
		},
	): Promise<void> {
		const { chatId, userId } = data
		await this.removeUserFromChat(chatId, userId)
		this.server.to(chatId).emit('updateChat', await this.chatService.getChatsForUser(userId))
	}

	@SubscribeMessage('leaveChat')
	async handleLeaveChatEvent(
		@MessageBody() data: { userId: string; chatId: string },
		@ConnectedSocket() client: Socket,
	) {
		try {
			const { userId, chatId } = data
			const chat = await this.chatService.getChat(chatId, userId)

			const remainingUsers = chat.users.filter((u) => u.userId !== userId).map((u) => u.userId)

			await this.handleLeaveChat(client, userId, chatId)

			// Отправляем подтверждение пользователю
			client.emit('leftChat', { userId, chatId })

			for (const userChatId of remainingUsers) {
				const socket = this.users.get(userChatId)
				if (socket) {
					socket.emit('updateChat', await this.chatService.getChatsForUser(userChatId))
				}
			}
		} catch (error) {
			client.emit('error', 'Error while leaving the chat')
			console.error('Error in handleLeaveChatEvent:', error)
		}
	}

	@SubscribeMessage('removeMessage')
	async handleRemoveMessage(
		@MessageBody() data: {
			id: string
			chatId: string
			userId: string
		},
	) {
		const { id, chatId, userId } = data

		await this.remove(id)

		this.server.to(chatId).emit('messageRemoved', { id })
		const chat = await this.chatService.getChat(chatId, userId)
		for (const userChatId of chat.users.map((u) => u.userId)) {
			const socket = this.users.get(userChatId)
			if (socket) {
				socket.emit('updateChat', await this.chatService.getChatsForUser(userChatId))
			}
		}
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

		const formattedMessage = {
			...updatedMessage,
			respondedTo: updatedMessage.respondedTo.map((response) => ({
				id: response.parentMessageId,
				content: response.parentMessage?.content,
				user: response.parentMessage?.user,
			})),
		}

		this.server.to(chatId).emit('messageUpdated', formattedMessage)

		this.server.to(chatId).emit('updateChat', await this.chatService.getChatsForUser(updatedMessage.user.id))
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

		await this.sendChatMessages(chatId)
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

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (!user) {
			client.emit('error', 'User not found')
			return
		}

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

		if (parentMessageId && Array.isArray(parentMessageId)) {
			const parentLinks = parentMessageId.map((parentId) => ({
				parentMessageId: parentId,
				childMessageId: newMessage.id,
			}))

			await this.prisma.chatMessageReplies.createMany({
				data: parentLinks,
			})
		}

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

		this.server.to(chatId).emit('newMessage', {
			...fullMessage,
			respondedTo: fullMessage.respondedTo.map((response) => ({
				id: response.parentMessageId,
				content: response.parentMessage?.content,
				user: response.parentMessage?.user,
			})),
		})

		const chat = await this.chatService.getChat(chatId, userId)
		for (const userChatId of chat.users.map((u) => u.userId)) {
			const socket = this.users.get(userChatId)
			if (socket) {
				socket.emit('updateChat', await this.chatService.getChatsForUser(userChatId))
			}
		}
	}
}
