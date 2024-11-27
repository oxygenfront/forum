import type { IChapterPageRes } from '@/pages/Chapter'
import { ApiTag, GET_CHAPTERS, rootApi } from '@/shared/api'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChapterPage: builder.query<IChapterPageRes, unknown>({
			query: (id) => `${GET_CHAPTERS}/${id}`,
			providesTags: [ApiTag.CHAPTERS],
		}),
	}),
})

export const { useGetChapterPageQuery } = chaptersApi
