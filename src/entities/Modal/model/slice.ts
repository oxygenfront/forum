import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: false,
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleModal: (state) => {
			state.status = !state.status
		},
	},
})

export const { toggleModal } = modalSlice.actions
