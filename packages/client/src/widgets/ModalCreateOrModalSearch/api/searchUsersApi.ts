import { SEARCH_USERS, rootApi } from '@/shared/api'
import type { TSearchUserRes } from '@/shared/types'

export const searchUsersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		searchUsers: builder.query<TSearchUserRes[], string>({
			query: (query) => `${SEARCH_USERS}/?q=${query}`,
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useSearchUsersQuery } = searchUsersApi
