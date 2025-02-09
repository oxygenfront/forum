import { RequestMethod, rootApi } from '@/shared/api'
import { CREATE_CHAT } from '@/shared/api/utils'
import type { ICreateChatReq } from '@/shared/types'

export const createChatApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createChat: builder.mutation<void, ICreateChatReq>({
			query: (body) => ({ url: `${CREATE_CHAT}`, body, method: RequestMethod.POST }),
		}),
	}),
})

export const { useCreateChatMutation } = createChatApi
