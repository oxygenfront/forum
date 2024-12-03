import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

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

	@ApiProperty()
	@IsOptional()
	parentMessageIds?: string[]
}

export class CreateMessageDto extends ThemeMessage {}
