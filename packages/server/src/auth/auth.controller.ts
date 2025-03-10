import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { Route, SwaggerApiTag } from '../../global/constants'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags(SwaggerApiTag.AUTH)
@Controller(Route.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private setCookie(res: Response, refreshToken: string) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
		})
	}

	@Post(Route.REGISTER)
	async register(@Body() registerUserDto: RegisterDto, @Res() res: Response) {
		const user = await this.authService.register(registerUserDto)
		this.setCookie(res, user.refreshToken)

		return res.status(HttpStatus.CREATED).json({
			accessToken: user.accessToken,
			id: user.id,
			userImage: user.userImage,
			userLogin: user.userLogin,
			userEmail: user.userEmail,
			role: user.role,
			createdAt: user.createdAt,
			is_show_animated_avatar: user.is_show_animated_avatar,
			is_close_wall_on_change: user.is_close_wall_on_change,
			is_show_status_online: user.is_show_status_online,
			is_private: user.is_private,
			avatarColor: user.avatarColor,
		})
	}

	// Вход пользователя
	@Post(Route.LOGIN)
	async login(@Body() data: LoginDto, @Res() res: Response) {
		const user = await this.authService.login(data, res)

		this.setCookie(res, user.refreshToken)

		return res.json({
			accessToken: user.accessToken,
			id: user.id,
			userImage: user.userImage,
			userLogin: user.userLogin,
			userEmail: user.userEmail,
			role: user.role,
			createdAt: user.createdAt,
			is_show_animated_avatar: user.is_show_animated_avatar,
			is_close_wall_on_change: user.is_close_wall_on_change,
			is_show_status_online: user.is_show_status_online,
			is_private: user.is_private,
			avatarColor: user.avatarColor,
		})
	}

	@Post(Route.LOGOUT)
	async logout(@Req() req: Request, @Res() res: Response) {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const userId = req.user['sub']
		if (!userId) {
			return res.status(HttpStatus.FORBIDDEN).json({ message: 'Unauthorized' })
		}
		await this.authService.logout(userId, res)
		res.clearCookie('refreshToken')

		return res.status(HttpStatus.OK).send()
	}

	@Get(Route.REFRESH)
	async refreshTokens(@Req() req: Request, @Res() res: Response) {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const userId = req.user['sub']
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const refreshToken = req.cookies['refreshToken'] || req.user['refreshToken']

		const tokens = await this.authService.refreshTokens(userId, refreshToken, res)

		this.setCookie(res, tokens.refreshToken)

		return res.json({
			accessToken: tokens.accessToken,
		})
	}

	@UseGuards(AccessTokenGuard)
	@Get(Route.AUTH_ME)
	authMe(@CurrentUser() user: User) {
		return {
			id: user.id,
			userImage: user.userImage,
			userLogin: user.userLogin,
			userEmail: user.userEmail,
			role: user.role,
			createdAt: user.createdAt,
			is_show_animated_avatar: user.is_show_animated_avatar,
			is_close_wall_on_change: user.is_close_wall_on_change,
			is_show_status_online: user.is_show_status_online,
			is_private: user.is_private,
			avatarColor: user.avatarColor,
		}
	}
}
