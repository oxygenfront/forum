import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { CreateThemeDto } from './dto/create-theme.dto'
import { UpdateThemeDto } from './dto/update-theme.dto'
import { ThemeService } from './theme.service'

@ApiTags(SwaggerApiTag.ChapterTheme)
@Controller('themes')
export class ThemeController {
	constructor(private readonly themeService: ThemeService) {}

	@Get()
	findAll() {
		return this.themeService.findAll()
	}

	@Post(Route.CREATE)
	create(@Body() createChapterThemeDto: CreateThemeDto) {
		return this.themeService.create(createChapterThemeDto)
	}

	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string, @Query() paginationQuery: { page: number; limit: number }) {
		const page = paginationQuery.page || 1
		const limit = paginationQuery.limit || 10
		return this.themeService.findOne(id, page, limit)
	}

	@Patch(Route.UPDATE_BY_ID)
	update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
		return this.themeService.update(id, updateThemeDto)
	}

	@Delete(Route.DELETE_BY_ID)
	remove(@Param('id') id: string) {
		return this.themeService.remove(id)
	}
}
