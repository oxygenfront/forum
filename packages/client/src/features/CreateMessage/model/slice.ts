import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	themeId: string
	content: string
	userId: string
}

const initialState: IInitialState = {
	themeId: '',
	content: '',
	userId: '',
}

export const messageSlice = createSlice({
	name: 'messageSlice',
	initialState,
	reducers: {
		setValue: (state, { payload }: { payload: IInitialState }) => {
			state.content = payload.content
			state.themeId = payload.themeId
			state.userId = payload.userId
		},
	},
})

export const { setValue } = messageSlice.actions
