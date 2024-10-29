import type { IChapter } from '@/shared/model'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
	reducerPath: 'rootApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://a09ab73da26c002e.mokky.dev/' }),
	endpoints: (builder) => ({
		getChapters: builder.query<IChapter[], any>({
			query: (query) => `chapters?_relations=${query}`,
		}),
	}),
})

export const { useGetChaptersQuery } = rootApi
