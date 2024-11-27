import { router } from '@/app/router'
import { store } from '@/app/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './global.sass'
import { Provider } from 'react-redux'

import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SnackbarProvider maxSnack={3}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</SnackbarProvider>
	</React.StrictMode>,
)
