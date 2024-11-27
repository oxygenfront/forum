import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async use(req: Request, _res: Response, next: NextFunction) {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const accessToken = req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1]
		if (accessToken) {
			try {
				req.user = await this.jwtService.verifyAsync(accessToken, {
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
				})
				next()
			} catch (error) {
				console.error('Access token verification failed', error)
				throw new UnauthorizedException('Invalid or expired access token')
			}
		} else {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			const refreshToken = req.cookies['refreshToken']
			if (!refreshToken) {
				throw new UnauthorizedException('Token not found')
			}

			try {
				req.user = await this.jwtService.verifyAsync(refreshToken, {
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
				})
				next()
			} catch (error) {
				console.error('Refresh token verification failed', error)
				throw new UnauthorizedException('Invalid or expired refresh token')
			}
		}
	}
}
