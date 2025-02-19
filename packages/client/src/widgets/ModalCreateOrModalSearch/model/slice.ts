import type { TSearchUserRes } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IModalNewChatOrSearchUsersSlice {
	title: string
	message: string
	createModalOpen: boolean
	addedUsers: TSearchUserRes[]
	searchUsersModalOpen: boolean
}

const initialState: IModalNewChatOrSearchUsersSlice = {
	title: '',
	addedUsers: [],
	message: '',
	createModalOpen: false,
	searchUsersModalOpen: false,
}

export const modalNewChatOrSearchUsersSlice = createSlice({
	name: 'modalNewChatOrSearchUsersSlice',
	initialState,
	reducers: {
		toggleCreateModalOpen: (state) => {
			state.createModalOpen = !state.createModalOpen
		},

		toggleSearchUserModalOpen: (state) => {
			state.searchUsersModalOpen = !state.searchUsersModalOpen
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

		clearReplyData: (state) => {
			state.message = ''
			state.addedUsers = []
			state.createModalOpen = false
			state.title = ''
			state.searchUsersModalOpen = false
		},
	},
})

export const {
	toggleCreateModalOpen,
	toggleSearchUserModalOpen,

	addUserInChat,
	changeTitle,
	changeMessage,
	clearData,
} = modalNewChatOrSearchUsersSlice.actions
