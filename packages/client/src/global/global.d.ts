declare global {
	declare type RootState = import('./app/store.ts').RootState
	declare type AppDispatch = import('./app/store.ts').AppDispatch
}

export type {}