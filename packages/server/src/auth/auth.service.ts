import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as argon2 from 'argon2'
import { FORM_HINTS_ERRORS } from 'client/src/shared/constants'
import { Response as ExpressResponse } from 'express'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

type TTypeError = keyof Omit<RegisterDto, 'role' | 'id' | 'userImage'>
type TValidationErrors = { inputType: TTypeError; hintKey: keyof typeof FORM_HINTS_ERRORS }[]

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
			const validationErrors: TValidationErrors = []
			const avatarColors = [
				'#FF6B6B', // Red
				'#6BCB77', // Green
				'#4D96FF', // Blue
				'#FFCC00', // Yellow
				'#FF7F50', // Coral
				'#6A5ACD', // Slate Blue
				'#40E0D0', // Turquoise
				'#FF69B4', // Hot Pink
				'#8A2BE2', // Blue Violet
				'#FFA07A', // Light Salmon
				'#00FA9A', // Medium Spring Green
				'#FFD700', // Gold
				'#7FFF00', // Chartreuse
				'#FF4500', // Orange Red
				'#00CED1', // Dark Turquoise
			]
			const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]
			this.validateRegistrationData(registerUserDto, validationErrors)

			const userEmailExists = await this.usersService.findByEmail(registerUserDto.userEmail)
			const userLoginExists = await this.usersService.findByLogin(registerUserDto.userLogin)
			if (userEmailExists) {
				validationErrors.push({
					inputType: 'userEmail',
					hintKey: 'EMAIL_ALREADY_REGISTERED',
				})
			}

			if (userLoginExists) {
				validationErrors.push({ inputType: 'userLogin', hintKey: 'LOGIN_ALREADY_REGISTERED' })
			}

			if (validationErrors.length > 0) {
				throw new BadRequestException(validationErrors)
			}

			const hashedPassword = await this.hashData(registerUserDto.userPassword)

			const newUser = await this.usersService.create({
				...registerUserDto,
				userPassword: hashedPassword,
				avatarColor: randomColor,
			})

			const tokens = await this.getTokens(newUser.id, newUser.userEmail)

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
			const validationErrors: TValidationErrors = []
			this.validateLoginData(data, validationErrors)

			if (validationErrors.length > 0) {
				throw new BadRequestException(validationErrors)
			}

			const user = await this.usersService.findByEmail(data.userEmail)
			if (!user) {
				throw new BadRequestException([
					{ hintKey: 'INVALID_CREDENTIALS', inputType: 'userPassword' },
					{ hintKey: 'INVALID_CREDENTIALS', inputType: 'userEmail' },
				])
			}

			const isPasswordValid = await argon2.verify(user.userPassword, data.userPassword)
			if (!isPasswordValid) {
				throw new BadRequestException([
					{ hintKey: 'INVALID_CREDENTIALS', inputType: 'userPassword' },
					{ hintKey: 'INVALID_CREDENTIALS', inputType: 'userEmail' },
				])
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

	logout(userId: string, res: ExpressResponse) {
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

	private validateLoginData(data: LoginDto, validationErrors: TValidationErrors): void {
		const { userEmail, userPassword } = data

		if (!userEmail) {
			validationErrors.push({ hintKey: 'EMPTY_EMAIL', inputType: 'userEmail' })
		} else if (!this.isValidEmail(userEmail)) {
			validationErrors.push({ hintKey: 'INVALID_EMAIL', inputType: 'userEmail' })
		}

		if (!userPassword) {
			validationErrors.push({ hintKey: 'EMPTY_PASSWORD', inputType: 'userPassword' })
		}
	}

	private validateRegistrationData(data: RegisterDto, validationErrors: TValidationErrors): void {
		const { userEmail, userPassword, userLogin } = data
		if (!userEmail) {
			validationErrors.push({ hintKey: 'EMPTY_EMAIL', inputType: 'userEmail' })
		} else if (!this.isValidEmail(userEmail)) {
			validationErrors.push({ hintKey: 'INVALID_EMAIL', inputType: 'userEmail' })
		}

		if (!userPassword) {
			validationErrors.push({ hintKey: 'EMPTY_PASSWORD', inputType: 'userPassword' })
		} else if (!this.isValidPassword(userPassword)) {
			validationErrors.push({
				hintKey: 'INVALID_PASSWORD',
				inputType: 'userPassword',
			})
		}

		if (!userLogin) {
			validationErrors.push({ hintKey: 'EMPTY_LOGIN', inputType: 'userLogin' })
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
					expiresIn: '1m',
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
