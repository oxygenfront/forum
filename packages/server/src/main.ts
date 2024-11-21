import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { Route } from '../global/constants'
import { EnvironmentVariables } from '../global/types'
import { AppModule } from './app.module'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

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

	const corsOptions: CorsOptions = {
		origin: ['http://localhost:5678'], // Replace with your React app's URL
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
		allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
		credentials: true, // Enable credentials (cookies, authorization) if needed
	}

	app.enableCors(corsOptions)
	const config = new DocumentBuilder()
		.setTitle('Darkforum')
		.setDescription('Darkforum API description')
		.setVersion('0.1')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)

	const { httpAdapter } = app.get(HttpAdapterHost)

	// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
	// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	const port = configService.get('PORT', { infer: true })

	await app.listen(port, () => {
		console.info(`⚡ Server is running at http://localhost:${port}/api`)
	})
}
bootstrap()
