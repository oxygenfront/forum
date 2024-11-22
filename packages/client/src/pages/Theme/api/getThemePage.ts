import { GET_THEMES, rootApi } from '@/shared/api'
import { ApiTag } from '@/shared/api/utils/constants'
import type { ITheme } from '@/shared/model'

export const chaptersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getThemePage: builder.query<ITheme, unknown>({
			query: (id) => `${GET_THEMES}/${id}`,
			providesTags: [ApiTag.THEMES],
		}),
	}),
})

export const { useGetThemePageQuery } = chaptersApi
