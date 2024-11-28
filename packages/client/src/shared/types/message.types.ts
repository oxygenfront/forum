import { IUser } from '@/shared/model'

export interface IMessage {
	id: string
	content: string
	themeId: string
	createdAt: Date
	updateAt: Date
	userId: string
	user: Pick<IUser, 'id' | 'userImage' | 'userLogin'>
}
