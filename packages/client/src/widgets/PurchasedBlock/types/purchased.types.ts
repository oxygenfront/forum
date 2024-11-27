export interface IResponsePurchased {
	id: string
	content: string
	createdAt: Date
	themeId: string
	chapterId: string
	titleTheme: string
	titleChapter: string
	user: {
		userLogin: string
		userImage: string | null
	}
}
