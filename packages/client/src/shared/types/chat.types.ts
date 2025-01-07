import type { IUserLessData } from '@/shared/types/user.types'

export interface IChat {
	id: string
	creatorId: string
	createdAt: Date
	latestMessage: ILatestMessage
	title: string
	usersCount: number
	messagesCount: number
}

export interface IChatMessage {
	id: string
	createdAt: Date
	respondedTo: Omit<IChatMessage, 'respondedTo' | 'parentMessage'>[] | null
	parentMessage: Omit<IChatMessage, 'respondedTo' | 'parentMessage'>
	userId: string
	chatId: string
	content: string
	updatedAt: Date
	user: IUserLessData
}

export interface IChatUser {
	chatId: string
	userId: string
	user: Omit<IUserLessData, 'userPassword'>
}

export interface ILatestMessage {
	createdAt: Date
	user: IUserLessData
	message: string
}

export type ChatRes = Pick<IChat, 'id' | 'title' | 'createdAt' | 'creatorId'> & {
	chatMessages: IChatMessage[]
	users: IChatUser[]
}
