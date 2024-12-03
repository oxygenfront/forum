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

	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
	async use(req: Request, res: Response, next: NextFunction) {
		const accessToken = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]
		const refreshToken = req.cookies.refreshToken
		if (accessToken) {
			try {
				req.user = await this.jwtService.verifyAsync(accessToken, {
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
				})
				return next()
			} catch (error) {
				if (error.name === 'TokenExpiredError' && refreshToken) {
					try {
						const decodedRefresh = await this.jwtService.verifyAsync(refreshToken, {
							secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
						})
						const newAccessToken = this.jwtService.sign(
							{ sub: decodedRefresh.sub },
							{ secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '1m' },
						)
						if (req.originalUrl.split('/')[3] === 'logout') {
							req.user = await this.jwtService.verifyAsync(newAccessToken, {
								secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
							})
							return next()
						}
						return res.json({ accessToken: newAccessToken })
					} catch (refreshError) {
						console.error('Refresh token verification failed', refreshError)
						throw new UnauthorizedException('Invalid or expired refresh token')
					}
				} else {
					console.error('Access token verification failed', error)
					throw new UnauthorizedException('Invalid or expired access token')
				}
			}
		}

		if (refreshToken) {
			try {
				const decodedRefresh = await this.jwtService.verifyAsync(refreshToken, {
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
				})

				const newAccessToken = this.jwtService.sign(
					{ sub: decodedRefresh.sub },
					{ secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '1m' },
				)

				return res.json({ accessToken: newAccessToken })
			} catch (refreshError) {
				console.error('Refresh token verification failed', refreshError)
				throw new UnauthorizedException('Invalid or expired refresh token')
			}
		}
		throw new UnauthorizedException('No tokens provided')
	}
}
