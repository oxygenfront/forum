import { GET_CHAPTERS, rootApi } from '@/shared/api'
import { ApiTag } from '@/shared/api/utils/constants'
import type { IChapter } from '@/shared/model'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChapterPage: builder.query<IChapter, string>({
			query: (id) => `${GET_CHAPTERS}/${id}`,
			providesTags: [ApiTag.CHAPTERS],
		}),
	}),
})

export const { useLazyGetChapterPageQuery } = chaptersApi
