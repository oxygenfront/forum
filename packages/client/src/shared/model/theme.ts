import { IMessage, IUser } from '@/shared/model'

export interface ITheme {
	id: string
	chapterId: string
	titleTheme: string
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
