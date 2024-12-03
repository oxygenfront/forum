import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'

@Injectable()
export class MessageService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createMessageDto: CreateMessageDto) {
		const { content, themeId, userId, parentMessageIds } = createMessageDto

		// Создание нового сообщения
		const newMessage = await this.prisma.themeMessage.create({
			data: {
				content,
				themeId,
				userId,
			},
		})

		if (parentMessageIds && parentMessageIds.length > 0) {
			const replyRelations = parentMessageIds.map((parentMessageId) => ({
				parentMessageId,
				childMessageId: newMessage.id,
			}))

			await this.prisma.messageReplies.createMany({
				data: replyRelations,
			})
		}

		return this.prisma.themeMessage.findUnique({
			where: { id: newMessage.id },
			include: {
				respondedTo: {
					include: {
						parentMessage: {
							include: {
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
	}

	findOne(id: string) {
		return this.prisma.themeMessage.findFirst({
			where: { id },
			include: {
				user: true,
			},
		})
	}

	async getRepliesToMessage(messageId: string) {
		const message = await this.prisma.themeMessage.findUnique({
			where: { id: messageId },
			include: {
				replies: {
					include: {
						childMessage: true,
					},
				},
			},
		})

		return message?.replies || []
	}

	update(currentMessageId: string, updateMessage: UpdateMessageDto) {
		return this.prisma.themeMessage.update({
			where: { id: currentMessageId },
			data: { content: updateMessage.content },
		})
	}

	async remove(id: string) {
		const repliesToRemove = await this.prisma.messageReplies.findMany({
			where: { OR: [{ parentMessageId: id }, { childMessageId: id }] },
		})

		if (repliesToRemove.length) {
			await this.prisma.messageReplies.deleteMany({
				where: { OR: [{ parentMessageId: id }, { childMessageId: id }] },
			})
		}

		return this.prisma.themeMessage.delete({
			where: { id },
		})
	}
}
