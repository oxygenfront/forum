import { ROLES } from '@/shared/model'

export interface IRegisterReq {
	userEmail: string
	userPassword: string
	userLogin: string
	userImage?: string
	role: ROLES
}
export interface IRegisterRes extends Omit<IRegisterReq, 'userPassword'> {
	accessToken: string
	id: string
	createdAt: string
	is_show_animated_avatar: boolean
	is_close_wall_on_change: boolean
	is_show_status_online: boolean
	is_private: boolean
}

export interface ILoginReq {
	userEmail: string
	userPassword: string
}

export type ILoginRes = IRegisterRes
