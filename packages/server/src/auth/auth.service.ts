import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as argon2 from 'argon2'

import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}
	async signUp(createUserDto: CreateUserDto): Promise<any> {
		// Check if user exists
		const userExists = await this.usersService.findByEmail(createUserDto.userEmail)
		if (userExists) {
			throw new BadRequestException('User already exists')
		}

		// Hash password
		const hash = await this.hashData(createUserDto.userPassword)
		const newUser = await this.usersService.create({
			...createUserDto,
			userPassword: hash,
		})
		const tokens = await this.getTokens(newUser.id, newUser.userEmail)
		await this.updateRefreshToken(newUser.id, tokens.refreshToken)
		return tokens
	}

	async signIn(data: AuthDto) {
		// Check if user exists
		const user = await this.usersService.findByEmail(data.userEmail)
		if (!user) {
			throw new BadRequestException('User does not exist')
		}
		const passwordMatches = await argon2.verify(user.userPassword, data.userPassword)
		if (!passwordMatches) {
			throw new BadRequestException('Password is incorrect')
		}
		const tokens = await this.getTokens(user.id, user.userEmail)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		return tokens
	}

	async logout(userId: string) {
		await this.usersService.update(userId, { refreshToken: null })
	}

	async refreshTokens(userId: string, refreshToken: string) {
		const user = await this.usersService.findById(userId)
		if (!user.refreshToken) {
			throw new ForbiddenException('Access Denied')
		}

		const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)

		if (!refreshTokenMatches) {
			throw new ForbiddenException('Access Denied refreshTokenMatches')
		}

		const tokens = await this.getTokens(user.id, user.userEmail)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		return tokens
	}

	hashData(data: string) {
		return argon2.hash(data)
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken)
		await this.usersService.update(userId, {
			refreshToken: hashedRefreshToken,
		})
	}

	async getTokens(userId: string, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
					expiresIn: '7d',
				},
			),
		])

		return {
			accessToken,
			refreshToken,
		}
	}
}
