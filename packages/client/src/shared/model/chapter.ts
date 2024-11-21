import { ITheme } from '@/shared/model/theme.ts'
import { IUser } from '@/shared/model/user.ts'

interface ILatestMessage {
	id: string
	userId: string
	content: string
	themeId: string
	createdAt: Date
	updateAt: Date
	user: Pick<IUser, 'userLogin' | 'userImage'>
}

export interface IChapter {
	id: string
	chapterTitle: string
	countThemes: number
	countMessages: number
	latestMessage: ILatestMessage
	chapterThemes: ITheme[]
}
