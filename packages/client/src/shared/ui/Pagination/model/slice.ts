import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentPage: 1,
}
export const paginationSlice = createSlice({
	name: 'paginationSlice',
	initialState,
	reducers: {
		setPagination: (state, { payload }: { payload: number }) => {
			state.currentPage = payload
		},
	},
})

export const { setPagination } = paginationSlice.actions
