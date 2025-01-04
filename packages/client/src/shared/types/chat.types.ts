import type { IUserLessData } from '@/shared/types/user.types'

export interface IChat {
	id: string
	creatorId: string
	latestMessage: {
		createdAt: Date
		user: IUserLessData
		message: string
	}
	title: string
	usersCount: number
	messagesCount: number
}
