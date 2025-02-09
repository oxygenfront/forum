import type { IChatData } from '@/shared/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IChatData = {
	chatMessages: [],
	createdAt: null as unknown as Date,
	creatorId: '',
	firstMessageDate: null as unknown as Date,
	latestMessageDate: null as unknown as Date,
	id: '',
	title: '',
	messagesCount: 0,
	users: [],
	usersCount: 0,
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState: initialState,
	reducers: {
		setChatData: (state, action: PayloadAction<IChatData>) => {
			Object.assign(state, action.payload)
		},
		clearChatData: (state) => {
			Object.assign(state, initialState)
		},
	},
})

export const { setChatData, clearChatData } = chatSlice.actions
