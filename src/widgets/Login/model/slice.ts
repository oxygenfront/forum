import { createSlice } from '@reduxjs/toolkit'

const initialState: { rememberMe: boolean } = {
	rememberMe: false,
}

export const rememberMeSlice = createSlice({
	name: 'rememberMe',
	initialState,
	reducers: {
		setRememberMe: (state, { payload }) => {
			state.rememberMe = payload
		},
	},
})

export const { setRememberMe } = rememberMeSlice.actions
