import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const timeSincePublication = (unix: number) => {
	return dayjs(unix * 1000)
		.locale('ru-ru')
		.fromNow()
}

export const transliterate = (text: string) => {
	const russianLetters: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'yo',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'kh',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ы: 'y',
		э: 'e',
		ю: 'yu',
		я: 'ya',
		' ': '-',
	}

	return text
		.toLowerCase()
		.split('')
		.map((char) => russianLetters[char] || char)
		.join('')
}
