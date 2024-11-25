import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'

@Injectable()
export class MessageService {
	constructor(private readonly prisma: PrismaService) {}
	create(createMessageDto: CreateMessageDto) {
		return this.prisma.themeMessage.create({
			data: createMessageDto,
		})
	}

	findOne(id: string) {
		return this.prisma.themeMessage.findFirst({
			where: { id },
		})
	}

	update(currentMessageId: string, updateMessage: UpdateMessageDto) {
		return this.prisma.themeMessage.update({
			where: { id: currentMessageId },
			data: { content: updateMessage.content },
		})
	}

	remove(id: string) {
		return this.prisma.themeMessage.delete({
			where: { id },
		})
	}
}
