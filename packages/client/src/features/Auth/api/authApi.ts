import {
	AUTH_LOGIN_API,
	AUTH_LOGOUT,
	AUTH_ME_API,
	AUTH_REGISTER_API,
	ApiTag,
	RequestMethod,
	rootApi,
} from '@/shared/api'

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
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					localStorage.setItem('token', data.accessToken)
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),

		register: builder.mutation({
			query: (body) => ({
				url: AUTH_REGISTER_API,
				method: RequestMethod.POST,
				body: JSON.stringify(body),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					localStorage.setItem('token', data.accessToken)
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: AUTH_LOGOUT,
				method: RequestMethod.POST,
			}),
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

export const { useLoginMutation, useGetAuthQuery, useRegisterMutation, useLogoutMutation } = authApi
