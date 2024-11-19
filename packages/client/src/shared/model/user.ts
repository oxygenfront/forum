import type { ROLES } from '@/shared/model'

export interface IUser {
	id: string
	avatar: string
	nickname: string
	role: ROLES
	purchased_last?: string
}
