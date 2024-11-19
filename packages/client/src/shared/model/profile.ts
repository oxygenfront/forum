import type { ROLES } from '@/shared/model'
import type { IMessageProfileWall } from '@/shared/model'

export interface IProfile {
	user_id: string
	role: ROLES
	is_ban: boolean
	user_image: string
	status_online: boolean

	count_comments: number
	count_reactions: number

	date_register: string
	messages_wall: IMessageProfileWall[]

	email: string

	is_show_animated_avatar: boolean
	is_close_wall_on_change: boolean
	is_show_status_online: boolean
	is_private: boolean
}
