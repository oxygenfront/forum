export enum Route {
	BASE = 'api',
	AUTH = 'auth',
	LOGIN = 'login',
	LOGOUT = 'logout',
	REFRESH = 'refresh',
	REGISTER = 'register',
	CREATE = 'create',
	GET_BY_ID = ':id',
	GET_BY_USERNAME = ':username',
	UPDATE_BY_ID = 'update/:id',
	GET_BY_EMAIL = ':email',
	USERS = 'users',
	DELETE_BY_ID = 'delete/:id',
	CHAPTERS = 'chapters/',
}

export enum SwaggerApiTag {
	BASE = 'Base API',
	AUTH = 'Auth API',
	USERS = 'Users API',
	CHAPTERS = 'Chapters API',
	ChapterTheme = 'Theme API',
}
