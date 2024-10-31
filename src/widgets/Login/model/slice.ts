import { createSlice } from '@reduxjs/toolkit'

const initialState: { rememberMe: boolean } = {
	rememberMe: false,
}

export const rememberMeSlice = createSlice({
	name: 'rememberMe',
	initialState,
	reducers: {
		setRememberMe: (state) => {
			state.rememberMe = !state.rememberMe
		},
	},
})

export const { setRememberMe } = rememberMeSlice.actions
