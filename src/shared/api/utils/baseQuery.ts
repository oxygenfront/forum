import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { API_BASE_URL } from '@/shared/api'

export const baseQueryFunction = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
	const response = await fetchBaseQuery({
		baseUrl: API_BASE_URL,
		credentials: 'include',
		prepareHeaders: (headers) => {
			const token = localStorage.getItem('token') || sessionStorage.getItem('token')

			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}

			return headers
		},
	})(args, api, extraOptions)
	const responseMeta = response.meta

	if (responseMeta?.response) {
		const { ok } = responseMeta.response
		if (!ok && responseMeta?.response.status === 401) {
			// TODO add redirect
			sessionStorage.removeItem('token')
		}
	}

	return response
}

export type TBaseQueryFn = typeof baseQueryFunction
