import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const timeSincePublication = (date: Date) => {
	if (!date) {
		return
	}
	const transformedDate = dayjs(date).unix()
	return dayjs(transformedDate * 1000)
		.locale('ru-ru')
		.fromNow()
}

export function createSlug(title: string | unknown) {
	if (typeof title !== 'string') {
		return
	}

	let slug = title
		.toLowerCase()
		.trim() // Убираем пробелы в начале и в конце
		.replace(/ +/g, '-') // Заменяем все пробелы на дефисы
		.replace(/[^\w\u0400-\u04FF-]+/g, '') // Удаляем все недопустимые символы
		.replace(/--+/g, '-') // Заменяем последовательные дефисы на один
		.replace(/^-+|-+$/g, '') // Удаляем дефисы в начале и в конце

	slug = slug
		.replace(/а/g, 'a')
		.replace(/б/g, 'b')
		.replace(/в/g, 'v')
		.replace(/г/g, 'g')
		.replace(/д/g, 'd')
		.replace(/е/g, 'e')
		.replace(/ё/g, 'e')
		.replace(/ж/g, 'zh')
		.replace(/з/g, 'z')
		.replace(/и/g, 'i')
		.replace(/й/g, 'y')
		.replace(/к/g, 'k')
		.replace(/л/g, 'l')
		.replace(/м/g, 'm')
		.replace(/н/g, 'n')
		.replace(/о/g, 'o')
		.replace(/п/g, 'p')
		.replace(/р/g, 'r')
		.replace(/с/g, 's')
		.replace(/т/g, 't')
		.replace(/у/g, 'u')
		.replace(/ф/g, 'f')
		.replace(/х/g, 'h')
		.replace(/ц/g, 'ts')
		.replace(/ч/g, 'ch')
		.replace(/ш/g, 'sh')
		.replace(/щ/g, 'shch')
		.replace(/ъ/g, '')
		.replace(/ы/g, 'y')
		.replace(/ь/g, '')
		.replace(/э/g, 'e')
		.replace(/ю/g, 'yu')
		.replace(/я/g, 'ya')

	return slug
}

export function replaceMessage(count_messages: number) {
	if (count_messages > 1000) {
		return String(Math.floor(count_messages / 1000)).concat('к')
	}
	return count_messages
}

export function trimmingText(str: string, maxLength = 20): string {
	if (str.length <= maxLength) {
		return str
	}
	return str.substring(0, maxLength).concat('...')
}
