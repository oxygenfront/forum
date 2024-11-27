import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { StatisticService } from './statistic.service'

@ApiTags(SwaggerApiTag.STATS)
@Controller(Route.STATS)
export class StatisticController {
	constructor(private statisticService: StatisticService) {}

	@Get()
	getStats() {
		return this.statisticService.getStats()
	}
}
