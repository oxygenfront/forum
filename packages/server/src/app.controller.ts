import { Controller, Get } from '@nestjs/common'

import { Public } from '../decorators/public.decorator'

import { ApiTags } from '@nestjs/swagger'
import { SwaggerApiTag } from '../global/constants'
import { AppService } from './app.service'

@ApiTags(SwaggerApiTag.BASE)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	getHello(): string {
		return this.appService.ping()
	}
}
