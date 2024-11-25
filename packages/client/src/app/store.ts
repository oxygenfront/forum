import { formTypeSlice, formsDataSlice } from '@/entities/Forms'
import { modalSlice } from '@/entities/Modal'
import { userSlice } from '@/features/Auth'
import { breadCrumbsSlice } from '@/features/BreadCrumbs'
import { messageSlice } from '@/features/CreateMessage/model'
import { rootApi } from '@/shared/api'
import { hintSlice } from '@/shared/ui/InputsForm'
import { rememberMeSlice } from '@/widgets/Login/model'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[modalSlice.name]: modalSlice.reducer,
	[formTypeSlice.name]: formTypeSlice.reducer,
	[formsDataSlice.name]: formsDataSlice.reducer,
	[breadCrumbsSlice.name]: breadCrumbsSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[hintSlice.name]: hintSlice.reducer,
	[rememberMeSlice.name]: rememberMeSlice.reducer,
	[messageSlice.name]: messageSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
	devTools: true,
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
