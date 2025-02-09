import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { Server } from 'socket.io'
import { ChatGateway } from './chat.gateway'

@Injectable()
export class ChatService {
	constructor(
		@Inject(forwardRef(() => ChatGateway))
		private readonly chatGateway: ChatGateway,
		private readonly prisma: PrismaService,
	) {}

	private getSocketIdForUser(userId: string): string | undefined {
		const userSocket = this.chatGateway.users.get(userId)
		return userSocket ? userSocket.id : undefined
	}

	async createChat(creatorId: string, userIds: string[], title: string, message: string, server: Server) {
		const chat = await this.prisma.chat.create({
			data: {
				creatorId,
				title,
				users: {
					create: userIds.map((userId) => ({
						userId,
					})),
				},
				chatMessages: {
					create: {
						userId: creatorId,
						content: message,
					},
				},
			},
		})

		const chatUsers = await this.prisma.chatUser.findMany({
			where: { chatId: chat.id },
			select: { userId: true },
		})

		for (const { userId } of chatUsers) {
			const socketId = this.getSocketIdForUser(userId)
			if (socketId) {
				server.to(socketId).emit('joinChat', { chatId: chat.id, userId })
				server.to(socketId).emit('updateChat', await this.getChatsForUser(userId))
			}
		}

		return chat
	}

	async getChatsForUser(userId: string) {
		const chats = await this.prisma.chat.findMany({
			where: {
				users: {
					some: {
						userId,
					},
				},
			},
			select: {
				id: true,
				creatorId: true,
				title: true,
				_count: {
					select: {
						users: true,
						chatMessages: true,
					},
				},
				chatMessages: {
					select: {
						content: true,
						createdAt: true,
						user: {
							select: {
								id: true,
								avatarColor: true,
								userImage: true,
								userLogin: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
		})

		return chats.map((chat) => ({
			id: chat.id,
			author: chat.creatorId,
			title: chat.title,
			usersCount: chat._count.users,
			messagesCount: chat._count.chatMessages,
			latestMessage: chat.chatMessages[0] ?? null,
		}))
	}

	async getChat(chatId: string, userId: string) {
		const chat = await this.prisma.chat.findFirst({
			where: {
				id: chatId,
				users: {
					some: {
						userId: userId,
					},
				},
			},
		})

		if (chat) {
			const chatDetails = await this.prisma.chat.findUnique({
				where: { id: chatId },
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

			return {
				chatMessages: chatDetails.chatMessages,
				createdAt: chatDetails.createdAt,
				creatorId: chatDetails.creatorId,
				id: chatDetails.id,
				title: chatDetails.title,
				users: chatDetails.users,
				usersCount: chatDetails._count.users,
				messagesCount: chatDetails._count.chatMessages,
				firstMessageDate: chatDetails.chatMessages[0]?.createdAt ?? null,
				latestMessageDate: chatDetails.chatMessages[chatDetails.chatMessages.length - 1]?.createdAt ?? null,
			}
		}
		return
		//
		// throw new HttpException(
		// 	{ message: 'Пользователь не имеет доступа к чату', status: HttpStatus.FORBIDDEN },
		// 	HttpStatus.FORBIDDEN,
		// )
	}
}
