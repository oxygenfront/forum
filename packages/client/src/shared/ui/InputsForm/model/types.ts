import type { FORM_HINTS_ERRORS } from '@/shared/constants/constants'

type ValueHint = { status: boolean; hintKey: keyof typeof FORM_HINTS_ERRORS | null }

export interface IRegisterHint {
	userLogin: ValueHint
	userEmail: ValueHint
	userPassword: ValueHint
	userConfirmPassword: ValueHint
}

export interface ILoginHint {
	userLogin: ValueHint
	userPassword: ValueHint
}

export interface IForgotHint {
	userEmail: ValueHint
}

export interface IInitialStateHint {
	register: IRegisterHint
	login: ILoginHint
	forgot: IForgotHint
}

export interface TPayloadHint {
	type: keyof IInitialStateHint
	key: keyof IRegisterHint | keyof ILoginHint | keyof IForgotHint
	status: boolean
	hintKey: keyof typeof FORM_HINTS_ERRORS | null
}
