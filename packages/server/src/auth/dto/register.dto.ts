import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { ROLES } from '../../../global/constants'

export class RegisterDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	id: string

	@ApiProperty()
	@IsString()
	userEmail: string

	@ApiProperty()
	@IsString()
	userPassword: string

	@ApiProperty()
	@IsString()
	userLogin: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	userImage: string

	@IsOptional()
	@ApiProperty({ default: 'user' })
	@IsString()
	role: ROLES
}
