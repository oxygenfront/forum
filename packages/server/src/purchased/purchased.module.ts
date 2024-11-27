import { Module } from '@nestjs/common'
import { PurchasedController } from './purchased.controller'
import { PurchasedService } from './purchased.service'

@Module({
	controllers: [PurchasedController],
	providers: [PurchasedService],
})
export class PurchasedModule {}
