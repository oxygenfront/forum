declare global {
	type RootState = import('@/app/store.ts').RootState
	type AppDispatch = import('@/app/store.ts').AppDispatch
}

export type {}