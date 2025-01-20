import { rootApi } from '@/shared/api'
import { GET_CHAT } from '@/shared/api/utils'
import type { ChatRes } from '@/shared/types'
const chatPageApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChat: builder.query<ChatRes, unknown>({
			query: ({ chatId, userId }) => ({
				url: `${GET_CHAT}/${chatId}?userId=${userId}`,
			}),
		}),
	}),
})

export const { useGetChatQuery } = chatPageApi
