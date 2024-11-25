import type { ROLES } from '@/shared/model/constants'

export interface ILoginResponse {
	accessToken: string
	id: number
	userEmail: string
	userLogin: string
	role: ROLES
}
