import { ApiTag, GET_STATS, rootApi } from '@/shared/api'
import type { IStatsRes } from '@/widgets/StatsBlock/types'

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getStats: builder.query<IStatsRes, void>({
			query: () => GET_STATS,
			providesTags: [ApiTag.STATS],
		}),
	}),
})

export const { useGetStatsQuery } = authApi
