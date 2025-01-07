import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Chat } from '@prisma/client'
import { Route } from '../../global/constants'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/chat.dto'

@ApiTags(Route.CHATS)
@Controller(Route.CHATS)
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post(Route.CREATE)
	@ApiOperation({ summary: 'Создание нового чата' })
	@ApiBody({
		description: 'Create a new chat',
		type: CreateChatDto,
	})
	createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
		const { creatorId, userIds, name } = createChatDto
		return this.chatService.createChat(creatorId, userIds, name)
	}

	@Get(Route.CHATS_USER)
	@ApiOperation({ summary: 'Получение всех чатов юзера' })
	getChatsForUser(@Param('userId') userId: string) {
		return this.chatService.getChatsForUser(userId)
	}

	@Get('current/:id')
	getChat(@Param('id') id: string) {
		return this.chatService.getChat(id)
	}
}
