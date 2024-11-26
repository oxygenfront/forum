import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SwaggerApiTag } from '../../global/constants'
import { SearchService } from './search.service'

@ApiTags(SwaggerApiTag.SEARCH)
@Controller('search')
export class SearchController {
	constructor(private searchService: SearchService) {}

	@Get('users')
	search(@Query('q') query: string) {
		return this.searchService.searchUsers(query)
	}

	@Get('all')
	searchAll(@Query('q') query: string) {
		return this.searchService.searchAll(query)
	}
}
