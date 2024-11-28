import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './auth/middleware/auth.middleware'
import { ChaptersModule } from './chapters/chapters.module'
import { MessageModule } from './message/message.module'
import { PurchasedModule } from './purchased/purchased.module'
import { SearchModule } from './search/search.module'
import { StatisticModule } from './statistic/statistic.module'
import { ChapterThemeModule } from './theme/theme.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
		}),
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				explicitConnect: true,
			},
		}),
		ChaptersModule,
		ChapterThemeModule,
		AuthModule,
		UsersModule,
		MessageModule,
		StatisticModule,
		PurchasedModule,
		SearchModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('auth/logout', 'auth/refresh')
	}
}
