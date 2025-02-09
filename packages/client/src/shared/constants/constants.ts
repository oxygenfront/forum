export enum PATH {
	BASE = '',
	ADMIN = '/admin',
	WARRANTOR = '/garant-service',
	CHAPTER = '/chapter/:slug/:id',
	THEME = '/chapter/:slug/:id/theme/:slug/:id',
	PROFILE = '/profile/:userLogin',
	ALL_CHATS = '/chats',
	CHAT = '/chats/:chatId',
}

export enum ROLES {
	ADMIN = 'admin',
	USER = 'user',
	WARRANTOR = 'warrantor',
	SELLER = 'seller',
}

export enum ROLES_UI {
	ADMIN = 'Администратор',
	WARRANTOR = 'Гарант-сервис',
	SELLER = 'Продавец',
	USER = 'Пользователь',
	USER1 = 'Шкет',
	USER2 = 'Бродяга',
	USER3 = 'Бывалый',
	USER4 = 'Авторитет',
	USER_VIP = 'VIP',
}

export const initChatData = {
	chatMessages: [],
	createdAt: null as unknown as Date,
	creatorId: '',
	firstMessageDate: null as unknown as Date,
	latestMessageDate: null as unknown as Date,
	id: '',
	title: '',
	messagesCount: 0,
	users: [],
	usersCount: 0,
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
