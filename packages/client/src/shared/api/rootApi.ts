import { baseQueryFunction } from '@/shared/api/utils'
import { ApiTag } from '@/shared/api/utils/constants'
import { createApi } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
	reducerPath: 'rootApi',
	refetchOnReconnect: true,

	baseQuery: baseQueryFunction,
	tagTypes: [
		ApiTag.CHAPTERS,
		ApiTag.AUTH,
		ApiTag.USERS,
		ApiTag.THEMES,
		ApiTag.MESSAGE,
		ApiTag.SEARCH,
		ApiTag.STATS,
		ApiTag.PURCHASED,
	],
	endpoints: () => ({}),
})
