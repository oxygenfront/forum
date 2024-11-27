export enum PATH {
	BASE = '',
	ADMIN = '/admin',
	WARRANTOR = '/garant-service',
	CHAPTER = '/chapter/:slug/:id',
	THEME = '/chapter/:slug/:id/theme/:slug/:id',
	MESSAGE = '/message/',
	PROFILE = '/profile',
}

export enum UI_COMPONENT {
	CHAPTER_LINK = 'chapter',
	THEME_LINK = 'theme',
}

export enum ROLES {
	ADMIN = 'Администратор',
	USER = 'Пользователь',
	WARRANTOR = 'Гарант',
	SELLER = 'Продавец',
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
	userAlreadyRegisteredEmail = 'Пользователь с такой почтой уже зарегистрирован',
	userAlreadyRegisterLogin = 'Пользователь с таким логином уже зарегистрирован',
}
