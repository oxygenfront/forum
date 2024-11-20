export enum Route {
	BASE = 'api',
	PING = 'ping',
	AUTH = 'auth',
	LOGIN = 'login',
	CREATE = 'create',
	GET_BY_ID = ':id',
	UPDATE = 'update',
	DELETE = 'delete',
	USERS = 'users',
	SIGNUP = 'signup',
	DELETE_BY_ID = 'delete/:id',
	CHAPTERS = 'chapters/',
}

export enum SwaggerApiTag {
	PING = 'ping',
	AUTH = 'auth',
	USERS = 'users',
	CHAPTERS = 'chapters',
	ChapterTheme = 'chapter theme',
}
