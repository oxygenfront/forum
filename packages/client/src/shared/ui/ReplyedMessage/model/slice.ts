import type { IMessageRes } from '@/shared/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialStateReplayed {
	replyMessageId: string
	replyMessages: IMessageRes[]
}

const initialState: IInitialStateReplayed = {
	replyMessageId: '',
	replyMessages: [],
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
		clearData: (state) => {
			state.replyMessageId = ''
			state.replyMessages = []
		},
	},
})

export const { addReplyMessage, setReplyMessageId, removeReplyMessage, clearData } = replayedSlice.actions
