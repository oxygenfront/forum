export enum PATH {
	BASE = '',
	ADMIN = '/admin',
	WARRANTOR = '/garant-service',
	CHAPTER = '/chapter/:chapterId',
	THEME = '/chapter/:id',
	TEST = '/test',
	PROFILE = "/profile",
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
	WARRANTOR = 'warrantor',
	SELLER = 'seller',
}

export enum THEME_STATUS {
	CLOSED = 'closed',
	POPULARITY = 'popularity',
}

export const ROUTES: { [key: string]: string } = {
	warrantor: 'Гарант',
	'': 'Форум',
}
