import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(
		private usersService: UsersService,
		private configService: ConfigService,
	) {
		super({
			secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => req.cookies.refreshToken, // Извлекаем refreshToken из cookies
			]),
		})
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	validate(payload: any) {
		return this.usersService.findById(payload.sub)
	}
}
