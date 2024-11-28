import { GET_THEMES, rootApi } from '@/shared/api'
import { ApiTag } from '@/shared/api/utils/constants'
import type { IThemePageRes } from '@/shared/types'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getThemePage: builder.query<IThemePageRes, string | undefined>({
			query: (id) => `${GET_THEMES}/${id}`,
			providesTags: [ApiTag.THEMES],
		}),
	}),
})

export const { useGetThemePageQuery } = chaptersApi
