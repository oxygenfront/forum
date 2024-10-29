import { createSlice } from '@reduxjs/toolkit'

type TInitialState = { crumbs: { path: string; name: string }[] }

const initialState: TInitialState = {
	crumbs: [],
}

export const breadCrumbsSlice = createSlice({
	name: 'breadCrumbs',
	initialState,
	reducers: {
		addCrumb: (state, action) => {
			state.crumbs = [...state.crumbs, action.payload]
		},
		removeCrumb: (state, action) => {
			const targetPath = action.payload // Изменяем на targetPath
			const index = state.crumbs.findIndex((crumb) => crumb.path === targetPath)

			// Удаляем все крошки начиная с targetPath
			if (index !== -1) {
				state.crumbs = state.crumbs.slice(0, index + 1)
			}
		},
	},
})

export const { addCrumb, removeCrumb } = breadCrumbsSlice.actions
