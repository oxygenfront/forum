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

export interface InputProps {
	label: string
	placeholder: string
	id: string
	type: 'login' | 'register' | 'forgot'
}

export type InputValue = ILogin | IRegister | IForgot

export interface IInitialState {
	login: ILogin
	register: IRegister
	forgot: IForgot
}

export interface TPayload {
	type: 'login' | 'register' | 'forgot'
	payload: Partial<InputValue>
}
