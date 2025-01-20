import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	themeId?: string
	content?: string
	userId?: string
	isEdit?: boolean
	messageId?: string
}

const initialState: IInitialState = {
	themeId: '',
	content: '',
	userId: '',
	messageId: '',
	isEdit: false,
}

export const messageSlice = createSlice({
	name: 'messageSlice',
	initialState,
	reducers: {
		setIsEdit: (state, { payload }: { payload: boolean }) => {
			state.isEdit = payload
		},

		setValue: (state, { payload }: { payload: IInitialState }) => {
			state.content = payload.content
			state.themeId = payload.themeId
			state.userId = payload.userId
			state.messageId = payload.messageId
			state.isEdit = payload.isEdit
		},
		clearData: (state) => {
			state.content = initialState.content
			state.themeId = initialState.themeId
			state.messageId = initialState.messageId
			state.isEdit = initialState.isEdit
		},
	},
})

export const { setValue, setIsEdit, clearData } = messageSlice.actions
