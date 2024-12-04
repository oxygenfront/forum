import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { IForgotHint, IInitialStateHint, ILoginHint, IRegisterHint, TPayloadHint } from './types'

const initialState: IInitialStateHint = {
	register: {
		userLogin: { status: false, hintKey: null },
		userEmail: { status: false, hintKey: null },
		userPassword: { status: false, hintKey: null },
		userConfirmPassword: { status: false, hintKey: null },
	},
	login: {
		userLogin: { status: false, hintKey: null },
		userPassword: { status: false, hintKey: null },
	},
	forgot: {
		userEmail: { status: false, hintKey: null },
	},
}

export const hintSlice = createSlice({
	name: 'hint',
	initialState,
	reducers: {
		setHint: (state, action: PayloadAction<TPayloadHint>) => {
			const { type, key, status, hintKey } = action.payload
			if (type === 'register') {
				state[type][key as keyof IRegisterHint] = { status, hintKey }
			} else if (type === 'forgot') {
				state[type][key as keyof IForgotHint] = { status, hintKey }
			} else {
				state[type][key as keyof ILoginHint] = { status, hintKey }
			}
		},
		clearHints: (state, action) => {
			switch (action.payload) {
				case 'login':
					state.login = initialState.login
					break
				case 'register':
					state.register = initialState.register
					break
				case 'forgot':
					state.forgot = initialState.forgot
			}
		},
	},
})

export const { setHint, clearHints } = hintSlice.actions
