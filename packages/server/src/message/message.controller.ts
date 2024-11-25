import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { MessageService } from './message.service'

@ApiTags(SwaggerApiTag.Messages)
@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Post(Route.CREATE)
	create(@Body() createMessageDto: CreateMessageDto) {
		return this.messageService.create(createMessageDto)
	}

	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.messageService.findOne(id)
	}

	@Patch(Route.UPDATE_BY_ID)
	update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
		return this.messageService.update(id, updateMessageDto)
	}

	@Delete(Route.DELETE_BY_ID)
	remove(@Param('id') id: string) {
		return this.messageService.remove(id)
	}
}
