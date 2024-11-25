import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ThemeMessage {
	@ApiProperty()
	@IsString()
	userId: string

	@ApiProperty()
	@IsString()
	content: string

	@ApiProperty()
	@IsString()
	themeId: string
}

export class CreateMessageDto extends ThemeMessage {}
