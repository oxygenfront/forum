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
						OR: [{ chapterTitle: { contains: query, mode: 'insensitive' } }],
					},
					select: {
						chapterTitle: true,
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
						OR: [{ titleTheme: { contains: query, mode: 'insensitive' } }],
					},
					select: {
						titleTheme: true,
						chapterId: true,
						chapters: {
							select: {
								chapterTitle: true,
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

			// Форматирование результатов
			const chaptersWithType = findChapters.map((chapter) => {
				const latestMessage = chapter.chapterThemes?.[0]?.themeMessages?.[0] || null

				return {
					id: chapter.id,
					title: chapter.chapterTitle,
					latestMessage,
					type: 'chapter',
				}
			})

			const themesWithType = findThemes.map((theme) => {
				const latestMessage = theme.themeMessages?.[0] || null

				return {
					id: theme.id,
					title: theme.titleTheme,
					chapterTitle: theme.chapters.chapterTitle,
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
