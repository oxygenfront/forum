import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Chat, ChatUser } from '@prisma/client'
import { Route } from '../../global/constants' // Подключаем типы
import { ChatService } from './chat.service'
import { AddUserToChatDto, CreateChatDto } from './dto/chat.dto'

@ApiTags(Route.CHATS) // Название группы для Swagger
@Controller(Route.CHATS)
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	// Создание нового чата
	@Post(Route.CREATE)
	@ApiOperation({ summary: 'Создание нового чата' }) // Описание операции
	@ApiBody({
		description: 'Create a new chat',
		type: CreateChatDto, // DTO для создания чата
	})
	createChat(
		@Body() createChatDto: CreateChatDto, // Параметры чата
	): Promise<Chat> {
		const { creatorId, userIds, name } = createChatDto
		return this.chatService.createChat(creatorId, userIds, name)
	}

	// Получить все чаты для пользователя
	@Get(Route.CHATS_USER)
	@ApiOperation({ summary: 'Получение всех чатов юзера' })
	getChatsForUser(@Param('userId') userId: string) {
		return this.chatService.getChatsForUser(userId)
	}

	@Get('current/:id')
	getChat(@Param('id') id: string) {
		return this.chatService.getChat(id)
	}

	// Добавить пользователя в чат
	@Post(Route.ADD_USER_IN_CHAT)
	@ApiOperation({ summary: 'Добавление пользователя в чат' })
	@ApiBody({
		description: 'Добавление пользователя в чат',
		type: AddUserToChatDto, // DTO для добавления пользователя
	})
	addUserToChat(
		@Body() addUserToChatDto: AddUserToChatDto, // Параметры для добавления пользователя
	): Promise<ChatUser> {
		const { chatId, userId } = addUserToChatDto
		return this.chatService.addUserToChat(chatId, userId)
	}
}
