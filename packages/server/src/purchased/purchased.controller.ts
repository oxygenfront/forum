import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../../global/constants'
import { PurchasedService } from './purchased.service'

@ApiTags(SwaggerApiTag.PURCHASED)
@Controller(Route.PURCHASED)
export class PurchasedController {
	constructor(private statisticService: PurchasedService) {}

	@Get()
	getLatestPurchased() {
		return this.statisticService.getLatestPurchased()
	}
}
