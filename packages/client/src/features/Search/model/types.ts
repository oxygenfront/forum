export interface IBaseResult {
	id: string
	title: string
	latestMessage: {
		content: string
		user: {
			userLogin: string
			userImage: string
		}
	}
}

export interface IThemeResult extends IBaseResult {
	chapterTitle: string
	chapterId: string
	type: 'theme'
}

export interface IChapterResult extends IBaseResult {
	type: 'chapter'
}
