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
		createMessage: builder.mutation({
			query: (body) => ({
				url: CREATE_MESSAGE,
				body: body,
				method: RequestMethod.POST,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS]
			},
		}),
		updateMessage: builder.mutation({
			query: ({ id, content }) => ({
				url: `${UPDATE_MESSAGE}/${id}`,
				body: { content },
				method: RequestMethod.PATCH,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS, ApiTag.MESSAGE]
			},
		}),
		deleteMessage: builder.mutation({
			query: (id) => ({
				url: `${DELETE_MESSAGE_BY_ID}/${id}`,
				method: RequestMethod.DELETE,
			}),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.THEMES, ApiTag.CHAPTERS]
			},
		}),
		getMessageById: builder.query({
			query: (id) => `${GET_MESSAGE_BY_ID}/${id}`,
		}),
	}),
})

export const { useCreateMessageMutation, useDeleteMessageMutation, useGetMessageByIdQuery, useUpdateMessageMutation } =
	messageApi
