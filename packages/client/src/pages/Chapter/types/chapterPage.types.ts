import { IMessage, ITheme } from '@/shared/model'

export interface IChapterPageRes {
	id: string
	titleChapter: string
	countThemes: number
	countMessages: number
	latestMessage: IMessage
	chapterThemes: ITheme[]
}
