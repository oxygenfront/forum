import { IMessage } from '@/shared/model'
import type { IThemePageRes } from '@/shared/types/themePage.types'

export interface IChapterPageRes {
	id: string
	titleChapter: string
	countThemes: number
	countMessages: number
	latestMessage: IMessage & { theme: { themeTitle: string } }
	chapterThemes: IThemePageRes[]
}
