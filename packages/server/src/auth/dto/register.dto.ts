import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ROLES } from '../../../global/constants'

export class RegisterDto {
	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	@IsOptional()
	id: string

	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	userEmail: string

	@IsNotEmpty()
	@ApiProperty()
	@IsString()
	userPassword: string

	@IsNotEmpty()
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
