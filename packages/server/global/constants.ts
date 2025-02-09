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
	GET_BY_USERNAME = 'username/:username',
	UPDATE_BY_ID = 'update/:id',
	GET_BY_EMAIL = 'email/:email',
	USERS = 'users',
	DELETE_BY_ID = 'delete/:id',
	CHAPTERS = 'chapters/',
	SEARCH = 'search',
	STATS = 'stats',
	PURCHASED = 'purchased',
	CHATS = 'chats',
	CHATS_USER = ':userId',
}

export enum FORM_HINTS_ERRORS {
	EMPTY_EMAIL = 'Поле почты не может быть пустым',
	EMPTY_LOGIN = 'Поле логина не может быть пустым',
	EMPTY_PASSWORD = 'Поле пароля не может быть пустым',
	PASSWORDS_DO_NOT_MATCH = 'Пароли не совпадают',
	INVALID_CREDENTIALS = 'Неверная почта или пароль',
	EMAIL_ALREADY_REGISTERED = 'Пользователь с такой почтой уже зарегистрирован',
	LOGIN_ALREADY_REGISTERED = 'Пользователь с таким логином уже зарегистрирован',
	INVALID_EMAIL = 'Некорректный email',
	INVALID_PASSWORD = 'Пароль должен содержать минимум 8 символов, включая цифры, буквы верхнего и нижнего регистра и специальные символы',
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
