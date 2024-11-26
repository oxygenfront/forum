import { SEARCH_ALL, rootApi } from '@/shared/api'

export const searchApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		searchAll: builder.query({
			query: (query) => `${SEARCH_ALL}/?q=${query}`,
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useSearchAllQuery } = searchApi
