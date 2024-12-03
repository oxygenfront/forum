import type { IMessageRes } from './messageApi.types'
import type { IThemePageRes } from './themePage.types'

export interface IChapterPageRes {
	id: string
	titleChapter: string
	countThemes: number
	countMessages: number
	latestMessage: IMessageRes & { theme: { themeTitle: string } }
	chapterThemes: IThemePageRes[]
}
