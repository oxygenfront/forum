import { AUTH_API, AUTH_LOGIN_API, ApiTag, RequestMethod, createRequest, rootApi } from '@/shared/api'

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getAuth: builder.query({
			query: () => AUTH_API,
			providesTags: [ApiTag.AUTH],
		}),
		login: builder.mutation({
			query: (body) => createRequest(AUTH_LOGIN_API, RequestMethod.POST, body),

			invalidatesTags: (result, error) => {
				if (!result || error) {
					return []
				}

				return [ApiTag.AUTH]
			},
		}),
	}),
	overrideExisting: false,
})

export const { useLoginMutation, useGetAuthQuery } = authApi
