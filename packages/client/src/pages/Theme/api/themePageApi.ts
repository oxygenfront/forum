import { GET_THEMES, rootApi } from '@/shared/api'
import { ApiTag } from '@/shared/api/utils/constants'
import type { IThemePageRes } from '@/shared/types'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getThemePage: builder.query<IThemePageRes, { id?: string; page?: number; limit?: number }>({
			query: ({ id, page }) => `${GET_THEMES}/${id}${page && `?page=${page}`}`,
			providesTags: [ApiTag.THEMES],
		}),
	}),
})

export const { useGetThemePageQuery } = chaptersApi
