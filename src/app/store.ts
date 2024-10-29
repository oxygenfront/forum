import { formTypeSlice } from '@/entities/Forms'
import { formsDataSlice } from '@/entities/Forms/FormsData'
import { modalSlice } from '@/entities/Modal'
import { breadCrumbsSlice } from '@/features/BreadCrumbs/model'
import { rootApi } from '@/shared/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[modalSlice.name]: modalSlice.reducer,
	[formTypeSlice.name]: formTypeSlice.reducer,
	[formsDataSlice.name]: formsDataSlice.reducer,
	[breadCrumbsSlice.name]: breadCrumbsSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
