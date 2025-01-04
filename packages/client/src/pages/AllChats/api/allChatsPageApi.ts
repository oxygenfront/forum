import { ApiTag, rootApi } from '@/shared/api'
import { GET_USER_CHATS } from '@/shared/api/utils'
import type { IChat } from '@/shared/types'

export const allChatsPageApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserChats: builder.query<IChat[], unknown>({
			query: (userId) => `${GET_USER_CHATS}/${userId}`,
			providesTags: [ApiTag.CHATS],
		}),
	}),
})

export const { useGetUserChatsQuery } = allChatsPageApi
