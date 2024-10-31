import { formTypeSlice, formsDataSlice } from '@/entities/Forms'
import { modalSlice } from '@/entities/Modal'
import { userSlice } from '@/features/Auth'
import { breadCrumbsSlice } from '@/features/BreadCrumbs'
import { rootApi } from '@/shared/api'
import { hintSlice } from '@/shared/ui/InputsForm'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[modalSlice.name]: modalSlice.reducer,
	[formTypeSlice.name]: formTypeSlice.reducer,
	[formsDataSlice.name]: formsDataSlice.reducer,
	[breadCrumbsSlice.name]: breadCrumbsSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[hintSlice.name]: hintSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
