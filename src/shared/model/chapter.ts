import type { ILatestActivity, IUser } from '@/shared/model'

export interface IChapter {
	id: string
	title_chapter: string
	count_themes: number // count themes in chapter
	count_messages: number // count messages in chapter
	last_message: ILatestActivity

	user: IUser
}
