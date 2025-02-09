import { ROLES } from '@/shared/constants'

export interface IUser {
	id: string
	userEmail: string
	userPassword: string
	userLogin: string
	userImage: string
	avatarColor: string
	role: ROLES
	createdAt: Date
	themeMessagesCount: number
	is_show_animated_avatar: boolean
	is_close_wall_on_change: boolean
	is_show_status_online: boolean
	is_private: boolean
}

export type IUserLessData = Pick<IUser, 'id' | 'userPassword' | 'userLogin' | 'avatarColor' | 'userImage' | 'userEmail'>
