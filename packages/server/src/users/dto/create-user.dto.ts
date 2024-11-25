import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ROLES } from '../../../global/constants'

export class CreateUserDto {
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

	@IsOptional()
	@ApiProperty()
	@IsBoolean()
	is_show_animated_avatar: boolean

	@IsOptional()
	@ApiProperty()
	@IsBoolean()
	is_close_wall_on_change: boolean

	@IsOptional()
	@ApiProperty()
	@IsBoolean()
	is_show_status_online: boolean

	@IsOptional()
	@ApiProperty()
	@IsBoolean()
	is_private: boolean

	@IsOptional()
	@ApiProperty()
	refreshToken: string | null
}
