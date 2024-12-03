import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PurchasedService {
	constructor(private readonly prisma: PrismaService) {}

	async getLatestPurchased() {
		const messages = await this.prisma.themeMessage.findMany({
			select: {
				id: true,
				content: true,
				createdAt: true,
				themeId: true,
				theme: {
					select: {
						chapterId: true,
						themeTitle: true,
						chapter: {
							select: {
								titleChapter: true,
							},
						},
					},
				},
				user: {
					select: {
						userLogin: true,
						userImage: true,
						avatarColor: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 5,
		})
		return messages.map((message) => ({
			id: message.id,
			content: message.content,
			createdAt: message.createdAt,
			themeId: message.themeId,
			chapterId: message.theme.chapterId,
			titleTheme: message.theme.themeTitle,
			titleChapter: message.theme.chapter.titleChapter,
			user: message.user,
		}))
	}
}
