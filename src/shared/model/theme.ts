import type { ILatestActivity, IUser } from '@/shared/model'
import type { THEME_STATUS } from '@/shared/model/constants'

export interface ThemeMessage {
	message_id: string // uuid v4

	author: IUser

	content: string // message to theme
	likes: number
	dislikes: number
}

export interface ITheme {
	theme_id: string // uuid v4

	author: IUser

	title_theme: string // title theme
	created_at: string // date from created
	count_views: number // all count views this theme
	count_messages: number // all count messages this theme

	latest_activity: ILatestActivity

	status: THEME_STATUS

	messages: ThemeMessage[]
}
