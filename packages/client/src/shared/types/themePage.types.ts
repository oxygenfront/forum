import type { IMessage } from './message.types'
import type { IUser } from './user.types'

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
	user: Pick<IUser, 'id' | 'userLogin' | 'userImage' | 'avatarColor'>
}
