import type { TSearchUserRes } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface INewChatSlice {
	title: string
	message: string
	createModalOpen: boolean
	addedUsers: TSearchUserRes[]
}

const initialState: INewChatSlice = {
	title: '',
	addedUsers: [],
	message: '',
	createModalOpen: false,
}

export const newChatSlice = createSlice({
	name: 'newChatSlice',
	initialState,
	reducers: {
		toggleCreateModalOpen: (state) => {
			state.createModalOpen = !state.createModalOpen
		},

		addUserInChat: (state, action: PayloadAction<TSearchUserRes>) => {
			const user = action.payload

			if (state.addedUsers.some((u) => u.id === user.id)) {
				state.addedUsers = state.addedUsers.filter((u) => u.id === user.id)
			} else {
				state.addedUsers.push(user)
			}
		},

		changeTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload
		},

		changeMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload
		},

		clearData: (state) => {
			state.message = ''
			state.addedUsers = []
			state.createModalOpen = false
			state.title = ''
		},
	},
})

export const { toggleCreateModalOpen, addUserInChat, changeTitle, changeMessage, clearData } = newChatSlice.actions
