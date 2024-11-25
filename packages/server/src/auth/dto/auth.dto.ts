import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class AuthDto {
	@ApiProperty()
	@IsNotEmpty()
	userEmail: string

	@IsNotEmpty()
	@ApiProperty()
	userPassword: string
}
