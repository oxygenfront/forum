import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { API_BASE_URL, AUTH_REFRESH } from '@/shared/api'

export const baseQueryFunction = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
	// Базовый запрос
	const baseQuery = fetchBaseQuery({
		baseUrl: API_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			// Берём токен из localStorage или sessionStorage
			const token = localStorage.getItem('token') || sessionStorage.getItem('token')
			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}
			return headers
		},
	})

	let response = await baseQuery(args, api, extraOptions)

	if (response.error?.status === 401) {
		const refreshResponse = await baseQuery({ url: AUTH_REFRESH, method: 'GET' }, api, extraOptions)

		if (refreshResponse.data && typeof refreshResponse.data === 'object' && 'accessToken' in refreshResponse.data) {
			const { accessToken } = refreshResponse.data as { accessToken: string }

			// Сохраняем новый токен
			localStorage.setItem('token', accessToken)

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
