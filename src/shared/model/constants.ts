export enum PATH {
	BASE = '',
	ADMIN = '/admin',
	WARRANTOR = '/garant-service',
	CHAPTER = '/chapter/:slug',
	THEME = '/chapter/:id',
	TEST = '/test',
	PROFILE = '/profile',
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

export enum FORM_HINTS_ERRORS {
	isEmptyLogin = 'Поле логина не может быть пустым',
	isEmptyEmail = 'Поле почты не может быть пустым',
	isEmptyPassword = 'Поле пароля не может быть пустым',
	isEmptyConfirmPassword = 'Поле подтверждения пароля не может быть пустым',
	incorrectLogin = 'Неверная почта или пароль',
	passwordsDoNotMatch = 'Пароли не совпадают',
	userAlreadyRegistered = 'Пользователь с такой почтой уже зарегистрирован',
}
