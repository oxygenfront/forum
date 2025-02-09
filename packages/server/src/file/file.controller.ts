// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as fs from 'node:fs'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as path from 'node:path'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

@Controller('files')
export class FileController {
	// Сделать метод статическим
	private static createUploadsFolder() {
		const folderPath = path.join(__dirname, '..', 'uploads') // Путь к папке uploads
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true }) // Создаем папку, если её нет
		}
	}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: (req, file, callback) => {
					FileController.createUploadsFolder() // Вызов статического метода
					callback(null, './uploads') // Путь, куда будет сохраняться файл
				},
				filename: (req, file, callback) => {
					const ext = path.extname(file.originalname) // Получаем расширение файла
					const filename = `${uuidv4()}${ext}` // Генерируем уникальное имя файла
					callback(null, filename)
				},
			}),
		}),
	)
	// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		// Возвращаем URL к файлу
		return { url: `/uploads/${file.filename}` }
	}
}
