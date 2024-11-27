import type { IMessage, IUser } from '@/shared/model'

export interface IThemePageRes {
	id: string
	chapterId: string
	themeTitle: string
	isPrivate: boolean
	userId: string
	createdAt: Date
	updateAt: Date
	views: number | null
	countThemeMessages: number
	latestThemeMessage: IMessage
	themeMessages: IMessage[]
	user: Pick<IUser, 'id' | 'userLogin' | 'userImage'>
}
