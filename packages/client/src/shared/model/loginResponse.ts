import type { ROLES } from '@/shared/model/constants'

export interface ILoginResponse {
	accessToken: string
	id: string
	userEmail: string
	userLogin: string
	role: ROLES
}
