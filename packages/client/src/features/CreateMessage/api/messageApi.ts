import type { ICreateMessageReq, IMessageRes } from '@/features/CreateMessage'
import {
	ApiTag,
	CREATE_MESSAGE,
	DELETE_MESSAGE_BY_ID,
	GET_MESSAGE_BY_ID,
	RequestMethod,
	UPDATE_MESSAGE,
	rootApi,
} from '@/shared/api'

const messageApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createMessage: builder.mutation<void, ICreateMessageReq>({
			query: (body) => ({
				url: CREATE_MESSAGE,
				body: body,
				method: RequestMethod.POST,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS, ApiTag.STATS, ApiTag.PURCHASED]
			},
		}),
		updateMessage: builder.mutation<void, { id: string; content: string }>({
			query: ({ id, content }) => ({
				url: `${UPDATE_MESSAGE}/${id}`,
				body: { content },
				method: RequestMethod.PATCH,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS, ApiTag.MESSAGE, ApiTag.PURCHASED]
			},
		}),
		deleteMessage: builder.mutation<void, string>({
			query: (id) => ({
				url: `${DELETE_MESSAGE_BY_ID}/${id}`,
				method: RequestMethod.DELETE,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS, ApiTag.STATS, ApiTag.PURCHASED]
			},
		}),
		getMessageById: builder.query<IMessageRes, string>({
			query: (id) => `${GET_MESSAGE_BY_ID}/${id}`,
		}),
	}),
})

export const { useCreateMessageMutation, useDeleteMessageMutation, useGetMessageByIdQuery, useUpdateMessageMutation } =
	messageApi
