import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Route } from '../../global/constants'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/chat.dto'

@ApiTags(Route.CHATS)
@Controller(Route.CHATS)
export class ChatController {
	constructor(
		private readonly chatService: ChatService,
		private readonly chatGateway: ChatGateway,
	) {}

	@Post(Route.CREATE)
	@ApiOperation({ summary: 'Создание нового чата' })
	@ApiBody({
		description: 'Create a new chat',
		type: CreateChatDto,
	})
	createChat(@Body() createChatDto: CreateChatDto) {
		const { creatorId, userIds, title, message } = createChatDto

		return this.chatService.createChat(creatorId, userIds, title, message, this.chatGateway.server)
	}

	@Get(Route.CHATS_USER)
	@ApiOperation({ summary: 'Получение всех чатов юзера' })
	getChatsForUser(@Param('userId') userId: string) {
		return this.chatService.getChatsForUser(userId)
	}

	@Get('current/:id')
	getChat(@Param('id') id: string, @Query('userId') userId: string) {
		return this.chatService.getChat(id, userId)
	}
}
