import { IUser } from '@/shared/model'

export interface IMessage {
	id: string
	userId: string
	content: string
	themeId: string
	createdAt: Date
	updateAt: Date
	user: IUser
	theme: {
		titleTheme?: string
	}
}
