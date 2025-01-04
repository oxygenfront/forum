import type { IMessageRes } from '@/shared/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialStateReplayed {
	replyMessageId: string
	chatReplyMessageId: string
	replyMessages: IMessageRes[]
	chatReplyMessages: IMessageRes[]
}

const initialState: IInitialStateReplayed = {
	replyMessageId: '',
	chatReplyMessageId: '',
	replyMessages: [],
	chatReplyMessages: [],
}

export const replayedSlice = createSlice({
	name: 'replayedSlice',
	initialState,
	reducers: {
		addReplyMessage: (state, { payload }: PayloadAction<IMessageRes>) => {
			const newMessage = payload

			if (!state.replyMessages.some((existingMessage) => existingMessage.id === newMessage.id)) {
				state.replyMessages = [...state.replyMessages, newMessage]
			}
			return
		},
		setReplyMessageId: (state, action) => {
			state.replyMessageId = action.payload
		},
		removeReplyMessage: (state, { payload }: PayloadAction<string>) => {
			state.replyMessages = state.replyMessages.filter((message) => message.id !== payload)
			state.replyMessageId = ''
		},

		addChatReplyMessage: (state, { payload }: PayloadAction<IMessageRes>) => {
			const newMessage = payload

			if (!state.chatReplyMessages.some((existingMessage) => existingMessage.id === newMessage.id)) {
				state.chatReplyMessages = [...state.chatReplyMessages, newMessage]
			}
			return
		},

		setChatReplyMessageId: (state, { payload }: PayloadAction<string>) => {
			state.chatReplyMessageId = payload
		},
		removeChatReplyMessage: (state, { payload }: PayloadAction<string>) => {
			state.chatReplyMessages = state.chatReplyMessages.filter((message) => message.id !== payload)
			state.chatReplyMessageId = ''
		},

		clearData: (state) => {
			state.replyMessageId = ''
			state.replyMessages = []
		},
	},
})

export const {
	addReplyMessage,
	setReplyMessageId,
	removeReplyMessage,
	addChatReplyMessage,
	removeChatReplyMessage,
	setChatReplyMessageId,
	clearData,
} = replayedSlice.actions
