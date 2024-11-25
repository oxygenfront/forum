import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'

@Injectable()
export class ChapterService {
	constructor(private readonly prisma: PrismaService) {}
	create(createChapterDto: CreateChapterDto) {
		const { chapterTitle } = createChapterDto

		return this.prisma.chapter.create({
			data: {
				chapterTitle,
			},
		})
	}

	async findAll() {
		const chapters = await this.prisma.chapter.findMany({
			select: {
				id: true,
				chapterTitle: true,
				chapterThemes: {
					select: {
						id: true,
						titleTheme: true,
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
										titleTheme: true,
									},
								},
							},
						},
					},
				},
			},
		})

		return chapters.map((chapter) => {
			const countThemes = chapter.chapterThemes.length
			const countMessages = chapter.chapterThemes.reduce((acc, theme) => acc + theme.themeMessages.length, 0)
			const latestMessage = chapter.chapterThemes
				.flatMap((el) => el.themeMessages.flatMap((el, i) => i === 0 && el))
				.filter((el) => el)[0]
			return {
				id: chapter.id,
				chapterTitle: chapter.chapterTitle,
				countThemes,
				countMessages,
				latestMessage,
			}
		})
	}

	async findOne(id: string) {
		const chapter = await this.prisma.chapter.findFirst({
			where: { id },
			include: {
				chapterThemes: {
					include: {
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
							},
						},
						user: {
							select: {
								id: true,
								userLogin: true,
								userImage: true,
							},
						},
					},
				},
			},
		})

		if (!chapter) {
			return null
		}

		const updatedChapterThemes = chapter.chapterThemes.map((theme) => ({
			...theme,
			countThemeMessages: theme.themeMessages.length,
			latestThemeMessage: theme.themeMessages[0],
		}))

		return {
			...chapter,
			chapterThemes: updatedChapterThemes,
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
