import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { ChapterService } from './chapter.service'
import { CreateChapterDto } from './dto/create-chapter.dto'
import { UpdateChapterDto } from './dto/update-chapter.dto'

@ApiTags(SwaggerApiTag.CHAPTERS)
@Controller(Route.CHAPTERS)
export class ChapterController {
	constructor(private readonly chaptersService: ChapterService) {}

	@Get()
	findAll() {
		return this.chaptersService.findAll()
	}

	@Post(Route.CREATE)
	create(@Body() createChapterDto: CreateChapterDto) {
		return this.chaptersService.create(createChapterDto)
	}

	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.chaptersService.findOne(id)
	}

	@Patch(Route.UPDATE_BY_ID)
	update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
		return this.chaptersService.update(id, updateChapterDto)
	}

	@Delete(Route.DELETE_BY_ID)
	remove(@Param('id') id: string) {
		return this.chaptersService.remove(id)
	}
}
