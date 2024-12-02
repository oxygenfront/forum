import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'

@Injectable()
export class ChapterService {
	constructor(private readonly prisma: PrismaService) {}

	create(createChapterDto: CreateChapterDto) {
		const { titleChapter } = createChapterDto

		return this.prisma.chapter.create({
			data: {
				titleChapter,
			},
		})
	}

	async findAll() {
		const chapters = await this.prisma.chapter.findMany({
			select: {
				id: true,
				titleChapter: true,
				chapterThemes: {
					select: {
						id: true,
						themeTitle: true,
						themeMessages: {
							orderBy: { createdAt: 'asc' },
							include: {
								user: {
									select: {
										id: true,
										userLogin: true,
										userImage: true,
									},
								},
								theme: {
									select: {
										themeTitle: true,
									},
								},
							},
						},
					},
				},
			},
		})

		const calculateCounts = (themes) => ({
			countThemes: themes.length,
			countMessages: themes.reduce((acc, theme) => acc + theme.themeMessages.length, 0),
		})

		const findLatestMessage = (themes) => {
			for (const theme of themes) {
				if (theme.themeMessages.length > 0) {
					return theme.themeMessages[0]
				}
			}
			return null
		}

		return chapters.map((chapter) => {
			const { countThemes, countMessages } = calculateCounts(chapter.chapterThemes)
			const latestMessage = findLatestMessage(chapter.chapterThemes)
			if (latestMessage) {
				return {
					id: chapter.id,
					titleChapter: chapter.titleChapter,
					countThemes,
					countMessages,
					latestMessage: {
						id: latestMessage.id,
						content: latestMessage.content,
						themeId: latestMessage.themeId,
						createdAt: latestMessage.createdAt,
						updateAt: latestMessage.updateAt,
						user: {
							id: latestMessage.user.id,
							userLogin: latestMessage.user.userLogin,
							userImage: latestMessage.user.userImage,
						},
						theme: latestMessage.theme,
					},
				}
			}
			return {
				id: chapter.id,
				titleChapter: chapter.titleChapter,
				countThemes,
				countMessages,
			}
		})
	}

	async findOne(id: string) {
		const chapter = await this.prisma.chapter.findFirst({
			where: { id },
			select: {
				id: true,
				titleChapter: true,
				chapterThemes: {
					select: {
						id: true,
						themeTitle: true,
						themeMessages: {
							select: {
								id: true,
								content: true,
								createdAt: true,
								user: {
									select: {
										id: true,
										userLogin: true,
										userImage: true,
									},
								},
							},
							take: 1,
							orderBy: { createdAt: 'desc' },
						},
						_count: {
							select: {
								themeMessages: true,
							},
						},
						user: {
							select: {
								id: true,
								userLogin: true,
								userImage: true,
								avatarColor: true,
							},
						},
					},
				},
			},
		})

		if (!chapter) {
			return null
		}
		const transformThemes = (themes) =>
			themes.map((theme) => ({
				id: theme.id,
				themeTitle: theme.themeTitle,
				countThemeMessages: theme._count.themeMessages,
				latestThemeMessage: theme.themeMessages[0] || null,
				user: theme.user,
			}))

		return {
			id: chapter.id,
			titleChapter: chapter.titleChapter,
			chapterThemes: transformThemes(chapter.chapterThemes),
		}
	}

	update(id: string, updateChapterDto: UpdateChapterDto) {
		return this.prisma.chapter.update({
			where: { id },
			data: updateChapterDto,
		})
	}

	remove(id: string) {
		return this.prisma.chapter.delete({
			where: { id },
		})
	}
}
