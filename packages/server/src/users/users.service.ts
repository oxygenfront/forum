import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { RegisterDto } from '../auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}
	create(registerUserDto: RegisterDto) {
		return this.prisma.user.create({ data: registerUserDto })
	}

	private userLessData = {
		id: true,
		userLogin: true,
		userImage: true,
		userEmail: true,
		avatarColor: true,
		role: true,
		createdAt: true,
		is_show_animated_avatar: true,
		is_close_wall_on_change: true,
		is_show_status_online: true,
		is_private: true,
	}

	findAll() {
		return this.prisma.user.findMany({
			select: this.userLessData,
		})
	}

	findById(id: string) {
		return this.prisma.user.findFirst({
			where: { id: id },
			select: this.userLessData,
		})
	}

	findByEmail(userEmail: string) {
		return this.prisma.user.findFirst({
			where: { userEmail: userEmail },
			select: this.userLessData,
		})
	}

	async findByLogin(userLogin: string) {
		const user = await this.prisma.user.findFirst({
			where: { userLogin },
			select: this.userLessData,
		})

		const count = await this.prisma.user.findFirst({
			where: { userLogin },
			select: {
				_count: {
					select: {
						themeMessages: true,
					},
				},
			},
		})

		return {
			...user,
			themeMessagesCount: count?._count.themeMessages ?? 0,
		}
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.prisma.user.updateMany({ where: { id: id }, data: updateUserDto })
	}

	getUserForAuthById(id: string) {
		return this.prisma.user.findFirst({ where: { id } })
	}
	getUserForAuthByEmail(userEmail: string) {
		return this.prisma.user.findFirst({ where: { userEmail } })
	}

	remove(id: string) {
		return this.prisma.user.delete({ where: { id: id } })
	}
}
