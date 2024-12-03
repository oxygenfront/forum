import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateThemeDto } from './dto/create-theme.dto'
import { UpdateThemeDto } from './dto/update-theme.dto'

@Injectable()
export class ThemeService {
	constructor(private readonly prisma: PrismaService) {}
	create(createThemeDto: CreateThemeDto) {
		return this.prisma.theme.create({
			data: {
				...createThemeDto,
				themeMessages: {
					create: createThemeDto.themeMessages,
				},
			},
		})
	}

	findAll() {
		return this.prisma.theme.findMany()
	}

	async findOne(id: string, page: number, limit: number) {
		const theme = await this.prisma.theme.findFirst({
			where: { id },
			include: {
				themeMessages: {
					orderBy: { createdAt: 'asc' },
					skip: (page - 1) * limit, // Пропуск записей на основе текущей страницы
					take: limit, // Количество сообщений на одной странице
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
				},
				_count: {
					select: {
						themeMessages: true, // Подсчет общего количества сообщений
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
		})

		if (!theme) {
			return null
		}

		const totalPages = Math.ceil(theme._count.themeMessages / limit)

		const meta = {
			totalItems: theme._count.themeMessages,
			totalPages: totalPages,
			currentPage: +page,
			itemsPerPage: limit,
		}
		return {
			id: theme.id,
			userId: theme.userId,
			chapterId: theme.chapterId,
			themeTitle: theme.themeTitle,
			isPrivate: theme.isPrivate,
			createdAt: theme.createdAt,
			updateAt: theme.updateAt,
			views: theme.views,
			themeMessages: theme.themeMessages,
			countThemeMessages: theme._count.themeMessages,
			user: theme.user,
			meta,
		}
	}

	update(currentThemeId: string, updateThemeDto: UpdateThemeDto) {
		return this.prisma.theme.update({
			where: { id: currentThemeId },
			data: {
				themeTitle: updateThemeDto.themeTitle,
				isPrivate: updateThemeDto.isPrivate,
			},
		})
	}

	remove(id: string) {
		return this.prisma.theme.delete({
			where: { id },
		})
	}
}
