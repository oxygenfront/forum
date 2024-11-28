import type { ROLES } from '@/shared/model'

export interface IUser {
	id: string
	userEmail: string
	userPassword: string
	userLogin: string
	userImage: string
	role: ROLES
	is_show_animated_avatar: boolean
	is_close_wall_on_change: boolean
	is_show_status_online: boolean
	is_private: boolean
	refreshToken: string | null
}
