import type { IUser, IUserLessData } from '@/shared/types/user.types'

export interface ICreateMessageReq {
	content: string
	themeId: string
	userId: string
	parentMessageIds?: string[]
}

export interface IResponded {
	id: string
	parentMessageId: string
	childMessageId: string
	parentMessage: {
		id: string
		userId: string
		content: string
		themeId: string
		createdAt: Date
		updatedAt: Date
		user: Pick<IUser, 'id' | 'userLogin'>
	}
}

export interface IMessageRes {
	id: string
	userId: string
	content: string
	themeId: string
	createdAt: Date
	updateAt: Date
	respondedTo: IResponded[]
	user: IUserLessData
}
