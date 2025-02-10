import { GET_CHAPTERS, rootApi } from '@/shared/api'
import type { IChapterPageRes } from '@/shared/types'

export const choosingThemeApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		choosingTheme: builder.query<IChapterPageRes[], void>({
			query: () => `${GET_CHAPTERS}`,
		}),
	}),
})

export const { useChoosingThemeQuery } = choosingThemeApi
