import type { IMessageRes } from '@/shared/types/messageApi.types'
import type { IUserLessData } from './user.types'

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
	latestThemeMessage: IMessageRes
	themeMessages: IMessageRes[]
	user: IUserLessData
	meta: {
		totalItems: number
		totalPages: number
		currentPage: number
		itemsPerPage: number
	}
}
