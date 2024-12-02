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
	EMPTY_EMAIL = 'Поле почты не может быть пустым',
	EMPTY_LOGIN = 'Поле логина не может быть пустым',
	EMPTY_PASSWORD = 'Поле пароля не может быть пустым',
	EMPTY_CONFIRM_PASSWORD = 'Вы должны подтвердить пароль',
	PASSWORDS_DO_NOT_MATCH = 'Пароли не совпадают',
	INVALID_CREDENTIALS = 'Неверная почта или пароль',
	EMAIL_ALREADY_REGISTERED = 'Пользователь с такой почтой уже зарегистрирован',
	LOGIN_ALREADY_REGISTERED = 'Пользователь с таким логином уже зарегистрирован',
	INVALID_EMAIL = 'Некорректный email',
	INVALID_PASSWORD = 'Пароль должен содержать минимум 8 символов, включая цифры, буквы верхнего и нижнего регистра и специальные символы',
}
