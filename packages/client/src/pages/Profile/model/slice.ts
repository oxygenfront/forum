import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	isEditProfile: boolean
}

const initialState: IInitialState = {
	isEditProfile: false,
}

export const editProfileSlice = createSlice({
	name: 'editProfile',
	initialState,
	reducers: {
		toggleEditProfile: (state) => {
			state.isEditProfile = !state.isEditProfile
		},
	},
})

export const { toggleEditProfile } = editProfileSlice.actions
