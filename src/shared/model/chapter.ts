import type { ILatestActivity } from '@/shared/model'
import type { ITheme } from '@/shared/model'

export interface IChapter {
	chapter_id: string // uuid v4
	count_themes: number // count themes in chapter
	messages: number // count messages in chapter
	latest_activity: ILatestActivity

	themes: ITheme[]
}
