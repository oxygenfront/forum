import { AUTH_LOGIN_API, AUTH_ME_API, ApiTag, RequestMethod, USER_REGISTER_API, rootApi } from '@/shared/api'

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getAuth: builder.query({
			query: () => AUTH_ME_API,
			providesTags: [ApiTag.AUTH],
		}),
		login: builder.mutation({
			query: (body) => ({
				url: AUTH_LOGIN_API,
				method: RequestMethod.POST,
				body,
			}),

			invalidatesTags: (result, error) => {
				if (!result || error) {
					return []
				}

				return [ApiTag.AUTH]
			},
		}),

		register: builder.mutation({
			query: (body) => ({
				url: USER_REGISTER_API,
				method: RequestMethod.POST,
				body: JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}),
		}),
	}),
	overrideExisting: false,
})

export const { useLoginMutation, useGetAuthQuery, useRegisterMutation } = authApi
