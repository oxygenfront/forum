import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SearchService {
	constructor(private prisma: PrismaService) {}

	searchUsers(query: string) {
		return this.prisma.user.findMany({
			where: {
				OR: [
					{ userLogin: { contains: query, mode: 'insensitive' } },
					{ userEmail: { contains: query, mode: 'insensitive' } },
				],
			},
		})
	}

	async searchAll(query: string) {
		try {
			// Параллельные запросы для повышения производительности
			const [findChapters, findThemes] = await Promise.all([
				this.prisma.chapter.findMany({
					where: {
						OR: [{ titleChapter: { contains: query, mode: 'insensitive' } }],
					},
					select: {
						titleChapter: true,
						id: true,
						chapterThemes: {
							select: {
								themeMessages: {
									orderBy: {
										createdAt: 'desc',
									},
									take: 1,
									select: {
										content: true,
										user: {
											select: {
												userLogin: true,
												userImage: true,
											},
										},
									},
								},
							},
						},
					},
				}),
				this.prisma.theme.findMany({
					where: {
						OR: [{ themeTitle: { contains: query, mode: 'insensitive' } }],
					},
					select: {
						themeTitle: true,
						chapterId: true,
						chapter: {
							select: {
								titleChapter: true,
							},
						},
						id: true,
						themeMessages: {
							orderBy: {
								createdAt: 'desc',
							},
							take: 1,
							select: {
								content: true,
								user: {
									select: {
										userLogin: true,
										userImage: true,
									},
								},
							},
						},
					},
				}),
			])

			const chaptersWithType = findChapters.map((chapter) => {
				const latestMessage = chapter.chapterThemes?.[0]?.themeMessages?.[0] || null

				return {
					chapterId: chapter.id,
					titleChapter: chapter.titleChapter,
					latestMessage,
					type: 'chapter',
				}
			})

			const themesWithType = findThemes.map((theme) => {
				const latestMessage = theme.themeMessages?.[0] || null

				return {
					themeId: theme.id,
					titleTheme: theme.themeTitle,
					chapterId: theme.chapterId,
					titleChapter: theme.chapter.titleChapter,
					latestMessage,
					type: 'theme',
				}
			})
			const results = [...chaptersWithType, ...themesWithType]

			if (results.length === 0) {
				return []
			}

			return results
		} catch (error) {
			console.error('Ошибка при выполнении поиска:', error)
			throw new Error('Не удалось выполнить поиск, попробуйте позже.')
		}
	}
}
