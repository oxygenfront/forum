import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as argon2 from 'argon2'
import { Response as ExpressResponse } from 'express'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async register(registerUserDto: RegisterDto): Promise<any> {
		const userExists = await this.usersService.findByEmail(registerUserDto.userEmail)
		if (userExists) {
			throw new BadRequestException('Пользователь с таким email уже существует')
		}

		const hashedPassword = await this.hashData(registerUserDto.userPassword)
		const newUser = await this.usersService.create({
			...registerUserDto,
			userPassword: hashedPassword,
		})

		const tokens = await this.getTokens(newUser.id, newUser.userEmail)
		await this.updateRefreshToken(newUser.id, tokens.refreshToken)

		return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, ...newUser }
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async login(data: LoginDto, res: ExpressResponse): Promise<any> {
		const user = await this.usersService.findByEmail(data.userEmail)
		if (!user) {
			throw new BadRequestException('Пользователь с таким email не найден')
		}

		const passwordMatches = await argon2.verify(user.userPassword, data.userPassword)
		if (!passwordMatches) {
			throw new BadRequestException('Неверный пароль')
		}

		const tokens = await this.getTokens(user.id, user.userEmail)

		this.setRefreshTokenCookie(res, tokens.refreshToken)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		return {
			user,
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		}
	}

	async logout(userId: string, res: ExpressResponse): Promise<{ message: string }> {
		await this.usersService.update(userId, { refreshToken: null })
		res.clearCookie('refreshToken')
		return { message: 'Выход выполнен успешно' }
	}

	async refreshTokens(
		userId: string,
		refreshToken: string,
		res: ExpressResponse,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.usersService.findById(userId)
		if (!user.refreshToken) {
			throw new ForbiddenException('Доступ запрещен')
		}

		const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)
		if (!refreshTokenMatches) {
			throw new ForbiddenException('Доступ запрещен')
		}

		const tokens = await this.getTokens(user.id, user.userEmail)
		await this.updateRefreshToken(user.id, tokens.refreshToken)

		this.setRefreshTokenCookie(res, tokens.refreshToken)

		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
		}
	}

	private hashData(data: string): Promise<string> {
		return argon2.hash(data)
	}

	private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
		const hashedRefreshToken = await this.hashData(refreshToken)
		await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
	}

	private async getTokens(userId: string, username: string): Promise<{ accessToken: string; refreshToken: string }> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{ sub: userId, username },
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{ sub: userId, username },
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '7d',
				},
			),
		])

		return { accessToken, refreshToken }
	}

	private setRefreshTokenCookie(res: ExpressResponse, refreshToken: string): void {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // Время жизни куки 7 дней
		})
	}
}
