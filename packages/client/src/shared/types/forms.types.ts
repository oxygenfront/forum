import type { ILoginReq, IRegisterReq } from '@/shared/types/auth.types'

export interface IForgot {
	userEmail: string
}

export interface InputProps {
	label: string
	placeholder: string
	id: keyof ILoginReq | keyof IRegisterReq | keyof IForgot
	type: 'login' | 'register' | 'forgot'
}

export type InputValue = ILoginReq | IRegisterReq | IForgot

export interface IInitialState {
	login: ILoginReq
	register: IRegisterReq
	forgot: IForgot
}

export interface TPayload {
	type: 'login' | 'register' | 'forgot'
	payload: Partial<InputValue>
}
