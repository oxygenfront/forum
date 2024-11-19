import { rootApi } from '@/shared/api'
import { ApiTag, CHAPTERS_API } from '@/shared/api/utils/constants'
import type { IChapter } from '@/shared/model'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChapters: builder.query<IChapter[], string>({
			query: (query) => `${CHAPTERS_API}?_relations=${query}`,
			providesTags: [ApiTag.CHAPTERS],
		}),
	}),
})

export const { useGetChaptersQuery } = chaptersApi
