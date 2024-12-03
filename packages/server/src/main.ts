import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as morgan from 'morgan'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { Route } from '../global/constants'
import { EnvironmentVariables } from '../global/types'

// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())
	app.use(morgan('dev'))
	app.setGlobalPrefix(Route.BASE)
	const configService = app.get(ConfigService<EnvironmentVariables>)

	const prismaService: PrismaService = app.get(PrismaService)
	prismaService.$on('query', (event) => {
		console.info(event)
	})

	// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
	app.useGlobalPipes(
		new ValidationPipe({
			enableDebugMessages: true,
			skipMissingProperties: true,
			transform: true,
		}),
	)
	const { httpAdapter } = app.get(HttpAdapterHost)

	const corsOptions: CorsOptions = {
		origin: ['http://localhost:5678'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}

	app.enableCors(corsOptions)
	const config = new DocumentBuilder()
		.setTitle('DarkForum')
		.setDescription('DarkForum API description')
		.setVersion('0.1')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)

	app.enableShutdownHooks()
	// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	const port = configService.get('PORT', { infer: true })

	await app.listen(port, () => {
		console.info(`\n⚡ Server is running at http://localhost:${port}/api`)
		console.info(`\n📄 Swagger is available at http://localhost:${port}/swagger`)
	})
}
bootstrap()
