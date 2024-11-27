import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class StatisticService {
	constructor(private readonly prisma: PrismaService) {}

	async getStats() {
		const countThemes = await this.prisma.theme.count()

		const countMessages = await this.prisma.themeMessage.count()

		const countUsers = await this.prisma.user.count()

		return { countThemes, countMessages, countUsers }
	}
}
