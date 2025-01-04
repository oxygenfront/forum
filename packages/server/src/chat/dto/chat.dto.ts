import { ApiProperty } from '@nestjs/swagger'

export class CreateChatDto {
	@ApiProperty()
	creatorId: string

	@ApiProperty({ type: [String] })
	userIds: string[]

	@ApiProperty()
	name: string
}

// DTO для добавления пользователя в чат
export class AddUserToChatDto {
	@ApiProperty()
	chatId: string

	@ApiProperty()
	userId: string
}
