export enum Route {
	BASE = 'api',
	AUTH = 'auth',
	LOGIN = 'login',
	LOGOUT = 'logout',
	REFRESH = 'refresh',
	REGISTER = 'register',
	CREATE = 'create',
	GET_BY_ID = ':id',
	AUTH_ME = 'auth_me',
	GET_BY_USERNAME = ':username',
	UPDATE_BY_ID = 'update/:id',
	GET_BY_EMAIL = ':email',
	USERS = 'users',
	DELETE_BY_ID = 'delete/:id',
	CHAPTERS = 'chapters/',
	SEARCH = 'search',
	STATS = 'stats',
	PURCHASED = 'purchased',
	CHATS = 'chats',
	CHATS_USER = ':userId',
	ADD_USER_IN_CHAT = 'addUser',
}

export enum SwaggerApiTag {
	BASE = 'Base API',
	AUTH = 'Auth API',
	USERS = 'Users API',
	CHAPTERS = 'Chapters API',
	ChapterTheme = 'Theme API',
	Messages = 'Messages API',
	SEARCH = 'Search API',
	STATS = 'Stats API',
	PURCHASED = 'Latest 5 purchased API',
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
	WARRANTOR = 'warrantor',
	SELLER = 'seller',
}
