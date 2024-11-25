import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { Route, SwaggerApiTag } from '../../global/constants'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@ApiTags(SwaggerApiTag.AUTH)
@Controller(Route.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(Route.REGISTER)
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto)
	}

	@Post(Route.LOGIN)
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data)
	}

	@UseGuards(AccessTokenGuard)
	@Get(Route.LOGOUT)
	logout(@Req() req: Request) {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const userId = req.user['sub']

		this.authService.logout(userId)
	}

	@UseGuards(RefreshTokenGuard)
	@Get(Route.REFRESH)
	refreshTokens(@Req() req: Request) {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const id = req.user['sub']

		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const refreshToken = req.user['refreshToken']

		return this.authService.refreshTokens(id, refreshToken)
	}
}
