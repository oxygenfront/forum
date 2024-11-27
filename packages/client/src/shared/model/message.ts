import { IUser } from '@/shared/model'

export interface IMessage {
	userThemeId: string
	id: string
	userId: string
	content: string
	themeId: string
	createdAt: Date
	updateAt: Date
	user: IUser
	theme: {
		themeTitle?: string
	}
}
