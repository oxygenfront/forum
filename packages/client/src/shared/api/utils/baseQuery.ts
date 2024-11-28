import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { RootState } from '@/app/store.ts'
import { API_BASE_URL, AUTH_REFRESH } from '@/shared/api'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const baseQueryFunction = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: API_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token') || sessionStorage.getItem('token')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		},
	})

	let response = await baseQuery(args, api, extraOptions)

	if (response.error?.status === 401) {
		const refreshResponse = await baseQuery({ url: AUTH_REFRESH, method: 'GET' }, api, extraOptions)

		if (refreshResponse.data && typeof refreshResponse.data === 'object' && 'accessToken' in refreshResponse.data) {
			const { accessToken } = refreshResponse.data as { accessToken: string }
			const state = api.getState() as RootState
			const { rememberMe } = state.rememberMe

			rememberMe || !localStorage.getItem('token')
				? localStorage.setItem('token', accessToken)
				: sessionStorage.setItem('token', accessToken)

			response = await baseQuery(args, api, extraOptions)
		} else {
			localStorage.removeItem('token')
			sessionStorage.removeItem('token')
			api.dispatch({ type: 'auth/logout' })
		}
	}

	return response
}

export type TBaseQueryFn = typeof baseQueryFunction
