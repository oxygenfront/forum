import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const timeSincePublication = (unix: number) => {
	return dayjs(unix * 1000)
		.locale('ru-ru')
		.fromNow()
}

export function createSlug(title: string) {
	let slug = title
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w\u0400-\u04FF-]+/g, '')
		.replace(/--+(?=[a-zа-я])/g, '-')
		.replace(/^[-]+|[-]+$/g, '')

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
