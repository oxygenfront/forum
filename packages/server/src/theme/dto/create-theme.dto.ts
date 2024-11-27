import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ThemeMessage } from '../../message/dto/create-message.dto'

export class CreateThemeDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	themeTitle: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	chapterId: string

	@ApiProperty()
	@IsNotEmpty()
	isPrivate: boolean

	@ApiProperty({ type: () => ThemeMessage, isArray: true })
	@IsArray()
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => ThemeMessage)
	themeMessages: ThemeMessage[]
}
