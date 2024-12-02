import { SEARCH_ALL, rootApi } from '@/shared/api'
import type { ISearchRes } from '@/shared/types'

export const searchApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		searchAll: builder.query<ISearchRes[], string>({
			query: (query) => `${SEARCH_ALL}/?q=${query}`,
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useSearchAllQuery } = searchApi
