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

	async findOne(id: string) {
		const theme = await this.prisma.theme.findFirst({
			where: { id },
			include: {
				themeMessages: {
					orderBy: { createdAt: 'asc' },
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
		})

		if (!theme) {
			return null
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
			user: theme.user,
			countThemeMessages: theme._count.themeMessages,
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
