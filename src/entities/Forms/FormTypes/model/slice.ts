import { createSlice } from '@reduxjs/toolkit'
import type { IInitialState } from './types'

const initialState: IInitialState = {
	type: 'login',
}

export const formTypeSlice = createSlice({
	name: 'formType',
	initialState,
	reducers: {
		toggleViewForm: (state, action) => {
			state.type = action.payload
		},
	},
})

export const { toggleViewForm } = formTypeSlice.actions
