import { GET_CHAPTERS, rootApi } from '@/shared/api'
import { ApiTag } from '@/shared/api/utils/constants'
import type { IChapterPageRes } from '@/shared/types'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChapters: builder.query<IChapterPageRes[], void>({
			query: () => `${GET_CHAPTERS}`,
			providesTags: [ApiTag.CHAPTERS],
		}),
	}),
})

export const { useGetChaptersQuery } = chaptersApi
