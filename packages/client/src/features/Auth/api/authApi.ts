import type { ILoginReq, ILoginRes, IRegisterReq, IRegisterRes } from '@/features/Auth'
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
		getAuth: builder.query<void, void>({
			query: () => AUTH_ME_API,
		}),
		login: builder.mutation<ILoginRes, ILoginReq>({
			query: (body) => ({
				url: AUTH_LOGIN_API,
				method: RequestMethod.POST,
				body,
			}),

			async onQueryStarted(_, { queryFulfilled, getState }) {
				try {
					const { data } = await queryFulfilled

					// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
					const state = getState() as RootState

					const { rememberMe } = state.rememberMe
					rememberMe
						? localStorage.setItem('token', data.accessToken)
						: sessionStorage.setItem('token', data.accessToken)
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),

		register: builder.mutation<IRegisterRes, IRegisterReq>({
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
		logout: builder.mutation<void, void>({
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
