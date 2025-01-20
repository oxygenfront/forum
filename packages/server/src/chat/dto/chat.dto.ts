import { ApiProperty } from '@nestjs/swagger'

export class CreateChatDto {
	@ApiProperty()
	creatorId: string

	@ApiProperty({ type: [String] })
	userIds: string[]

	@ApiProperty()
	title: string

	@ApiProperty()
	message: string
}

// DTO для добавления пользователя в чат
export class AddUserToChatDto {
	@ApiProperty()
	chatId: string

	@ApiProperty()
	userId: string
}
