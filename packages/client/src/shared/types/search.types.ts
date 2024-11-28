export interface ISearchRes {
	themeId: string
	titleTheme: string
	chapterId: string
	titleChapter: string
	latestMessage: {
		content: string
		user: {
			userLogin: string
			userImage: string | null
		}
	}
	type: 'theme' | 'chapter'
}
