import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
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
		try {
			const validationErrors: string[] = []

			this.validateRegistrationData(registerUserDto, validationErrors)

			const userExists = await this.usersService.findByEmail(registerUserDto.userEmail)
			if (userExists) {
				validationErrors.push('Пользователь с таким email уже существует')
			}

			if (validationErrors.length > 0) {
				throw new BadRequestException(validationErrors)
			}

			// Хеширование пароля
			const hashedPassword = await this.hashData(registerUserDto.userPassword)

			const newUser = await this.usersService.create({
				...registerUserDto,
				userPassword: hashedPassword,
			})

			const tokens = await this.getTokens(newUser.id, newUser.userEmail)

			// Обновление refresh-токена в базе данных
			await this.updateRefreshToken(newUser.id, tokens.refreshToken)

			return {
				...newUser,
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			}
		} catch (error) {
			console.error('Ошибка регистрации пользователя:', error)

			if (error instanceof BadRequestException) {
				throw error
			}

			throw new InternalServerErrorException('Произошла ошибка. Повторите попытку позже.')
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async login(data: LoginDto, res: ExpressResponse): Promise<any> {
		try {
			const user = await this.usersService.findByEmail(data.userEmail)
			if (!user) {
				throw new BadRequestException({
					type: 'login',
					message: 'Пользователь не зарегистрирован',
				})
			}

			const isPasswordValid = await argon2.verify(user.userPassword, data.userPassword)
			if (!isPasswordValid) {
				throw new BadRequestException({
					type: 'all',
					message: 'Неверный логин или пароль',
				})
			}

			const tokens = await this.getTokens(user.id, user.userEmail)

			this.setRefreshTokenCookie(res, tokens.refreshToken)

			await this.updateRefreshToken(user.id, tokens.refreshToken)

			return {
				...user,
				accessToken: tokens.accessToken,
				refreshToken: tokens.refreshToken,
			}
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error
			}
			console.error('Ошибка при входе пользователя:', error)
			throw new InternalServerErrorException('Произошла ошибка. Повторите попытку позже.')
		}
	}

	async logout(userId: string, res: ExpressResponse) {
		await this.usersService.update(userId, { refreshToken: null })
		res.clearCookie('refreshToken')
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

	private validateRegistrationData(data: RegisterDto, validationErrors: string[]): void {
		const { userEmail, userPassword, userLogin } = data

		if (!userEmail) {
			validationErrors.push('Email обязательное поле')
		} else if (!this.isValidEmail(userEmail)) {
			validationErrors.push('Некорректный email')
		}

		if (!userPassword) {
			validationErrors.push('Пароль обязательное поле')
		} else if (!this.isValidPassword(userPassword)) {
			validationErrors.push(
				'Пароль должен содержать минимум 8 символов, включая цифры, буквы верхнего и нижнего регистра и специальные символы',
			)
		}

		if (!userLogin) {
			validationErrors.push('Имя обязательное поле')
		}
	}

	private isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	private isValidPassword(password: string): boolean {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		return passwordRegex.test(password)
	}

	private hashData(data: string): Promise<string> {
		return argon2.hash(data)
	}

	private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
		const hashedRefreshToken = await this.hashData(refreshToken)
		await this.usersService.update(userId, { refreshToken: hashedRefreshToken })
	}

	private async getTokens(
		userId: string,
		username: string,
	): Promise<{
		accessToken: string
		refreshToken: string
	}> {
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
