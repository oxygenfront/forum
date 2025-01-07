import type { IUserLessData } from '@/shared/types/user.types'

export interface ICreateMessageReq {
	content: string
	themeId: string
	userId: string
	parentMessageIds?: string[]
}

export interface IMessageRes {
	id: string
	themeId: string
	userId: string
	content: string
	createdAt: Date
	updateAt: Date
	respondedTo: IResponded[]
	user: IUserLessData
}

export interface IResponded {
	id: string
	parentMessageId: string
	childMessageId: string
	parentMessage: Omit<IMessageRes, 'respondedTo'>
}
