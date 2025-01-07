import { Injectable } from '@nestjs/common'
import { Chat } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	createChat(creatorId: string, userIds: string[], title: string): Promise<Chat> {
		return this.prisma.chat.create({
			data: {
				creatorId,
				title,
				users: {
					create: userIds.map((userId) => ({
						userId,
					})),
				},
			},
		})
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

	getChat(id: string) {
		return this.prisma.chat.findUnique({
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
			},
		})
	}
}
