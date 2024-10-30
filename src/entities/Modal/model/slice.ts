import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	authModal: false,
	userModal: false,
}

export const modalSlice = createSlice({
	name: 'toggleModals',
	initialState,
	reducers: {
		toggleAuthModal: (state) => {
			state.authModal = !state.authModal
		},
		toggleUserModal: (state) => {
			state.userModal = !state.userModal
		},
	},
})

export const { toggleAuthModal, toggleUserModal } = modalSlice.actions
