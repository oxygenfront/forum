import { rootApi } from '@/shared/api'
import { GET_CHAT } from '@/shared/api/utils'
import type { IChat, IUserLessData } from '@/shared/types'
type ResponseChat = Omit<IChat, 'author'> & {
	chatMessages: { id: string; createdAt: Date; userId: string; chatId: string; message: string; updateAt: Date }[]
	users: Omit<IUserLessData, 'userPassword'>[]
}
export const chatPageApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getChat: builder.query<ResponseChat, unknown>({
			query: (chatId) => `${GET_CHAT}/${chatId}`,
		}),
	}),
})

export const { useGetChatQuery } = chatPageApi
