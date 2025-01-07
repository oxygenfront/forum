import { Module } from '@nestjs/common'
import { Server } from 'socket.io'
import { ChatController } from './chat.controller'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
	providers: [ChatService, ChatGateway, Server],
	controllers: [ChatController],
})
export class ChatModule {}
