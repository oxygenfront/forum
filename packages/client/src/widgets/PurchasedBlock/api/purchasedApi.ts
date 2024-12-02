import { ApiTag, GET_PURCHASED, rootApi } from '@/shared/api'
import type { IResponsePurchased } from '@/shared/types'
export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getLatestPurchased: builder.query<IResponsePurchased[], void>({
			query: () => GET_PURCHASED,
			providesTags: [ApiTag.PURCHASED],
		}),
	}),
})

export const { useGetLatestPurchasedQuery } = authApi
