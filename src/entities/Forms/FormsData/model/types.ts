export interface IInitialState {
	login: {
		userLogin: string
		userPassword: string
	}
	register: {
		userLogin: string
		userEmail: string
		userPassword: string
		userConfirmPassword: string
	}
	forgot: {
		userEmail: string
	}
}

export interface ILogin {
	userLogin: string
	userPassword: string
}
export interface IRegister {
	userLogin: string
	userEmail: string
	userPassword: string
	userConfirmPassword: string
}
export interface IForgot {
	userEmail: string
}
type InputValue = ILogin | IRegister | IForgot

export interface TPayload {
	type: 'login' | 'register' | 'forgot'
	payload: Partial<InputValue>
}
