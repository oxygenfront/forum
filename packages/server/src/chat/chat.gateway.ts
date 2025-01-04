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
	) {}
	private users: Map<string, Socket> = new Map()

	afterInit(server: Server) {
		console.log('WebSocket сервер инициализирован')
	}
	handleConnection(client: Socket) {
		client.emit('setUserId', client.id)
		console.log(`Client connected: ${client.id}`)
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`)
		this.users.forEach((value, key) => {
			if (value === client) {
				this.users.delete(key)
			}
		})
	}

	@SubscribeMessage('setUserId')
	handleSetUserId(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
		console.log(`User with ID ${userId} connected`)

		// Сохраняем сокет клиента с его ID
		this.users.set(userId, client)

		// Отправляем подтверждение клиенту
		client.emit('userIdSet', { status: 'success', userId })
	}

	@SubscribeMessage('joinChat')
	async handleJoinChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
		// Присоединяем пользователя к чату
		const user = await this.prisma.user.findUnique({
			where: { id: client.id }, // Это ID сессии клиента, можно передавать его через JWT или иным способом
		})

		if (!user) {
			client.emit('error', 'User not found')
			return
		}

		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: { users: true },
		})

		if (chat.users.some((user) => user.userId === client.id)) {
			client.join(chatId) // Подключаем клиента к комнате с этим chatId
			client.emit('joinedChat', chatId)
		} else {
			client.emit('error', 'User is not part of this chat')
		}
	}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(
		@MessageBody() data: { chatId: string; message: string; userId: string },
		@ConnectedSocket() client: Socket,
	) {
		const { chatId, message } = data

		// Находим пользователя по ID из соединения
		const user = await this.prisma.user.findUnique({
			where: { id: client.id },
		})

		if (!user) {
			client.emit('error', 'User not found')
			return
		}

		// Создаем новое сообщение в чате
		const newMessage = await this.prisma.chatMessage.create({
			data: {
				chatId, // Связываем сообщение с чатом
				userId: user.id, // Привязываем сообщение к пользователю
				message, // Содержимое сообщения
			},
		})

		// Отправляем сообщение всем пользователям в чат
		client.to(chatId).emit('newMessage', newMessage)
	}
}
