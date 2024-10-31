import { createSlice } from '@reduxjs/toolkit'
import type { IInitialState } from './types'

const initialState: IInitialState = {
	type: 'login',
}

export const formTypeSlice = createSlice({
	name: 'formType',
	initialState,
	reducers: {
		setTypeForm: (state, action) => {
			state.type = action.payload
		},
	},
})

export const { setTypeForm } = formTypeSlice.actions
