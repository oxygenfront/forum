import type { ROLES } from '@/shared/model/constants'

export interface ILoginResponse {
	token: string
	data: {
		id: number
		email: string
		userLogin: string
		role: ROLES
	}
}
