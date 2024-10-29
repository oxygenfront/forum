export enum Path {
	BASE = '/',
	AUTH = 'auth',
	ADMIN = 'admin',
	WARRANTOR = 'warrantor',
	CHAPTER = 'chapter',
	THEME = 'chapter/:id',
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
