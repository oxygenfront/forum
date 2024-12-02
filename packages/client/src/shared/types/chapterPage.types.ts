import type { IMessage } from './message.types'
import type { IThemePageRes } from './themePage.types'

export interface IChapterPageRes {
	id: string
	titleChapter: string
	countThemes: number
	countMessages: number
	latestMessage: IMessage & { theme: { themeTitle: string } }
	chapterThemes: IThemePageRes[]
}
