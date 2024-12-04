import { setIsLogin, setUserData } from '@/features/Auth'
import { clearUserData } from '@/features/Auth/model'
import {
	AUTH_LOGIN_API,
	AUTH_LOGOUT,
	AUTH_ME_API,
	AUTH_REGISTER_API,
	ApiTag,
	RequestMethod,
	rootApi,
} from '@/shared/api'
import type { ILoginReq, ILoginRes, IRegisterReq, IRegisterRes } from '@/shared/types'

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getAuth: builder.query<ILoginRes, void>({
			query: () => AUTH_ME_API,
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled
					dispatch(setUserData(data))
					dispatch(setIsLogin(true))
				} catch (error) {
					dispatch(setIsLogin(false))
					console.error('Error fetching auth:', error)
				}
			},
		}),
		login: builder.mutation<ILoginRes, ILoginReq>({
			query: (body) => ({
				url: AUTH_LOGIN_API,
				method: RequestMethod.POST,
				body,
			}),

			async onQueryStarted(_, { queryFulfilled, getState, dispatch }) {
				try {
					const { data } = await queryFulfilled

					// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
					const state = getState() as RootState
					dispatch(setIsLogin(true))
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
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data } = await queryFulfilled
					dispatch(setIsLogin(true))
					dispatch(setUserData(data))
					localStorage.setItem('token', data.accessToken)
				} catch (error) {
					console.error('Register failed:', error)
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
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled

					localStorage.removeItem('token')
					sessionStorage.removeItem('token')
					dispatch(clearUserData())
					dispatch(authApi.endpoints.getAuth.initiate(undefined, { forceRefetch: true }))
				} catch (error) {
					console.error('Logout failed:', error)
				}
			},
		}),
	}),
	overrideExisting: false,
})

export const { useLoginMutation, useGetAuthQuery, useRegisterMutation, useLogoutMutation } = authApi
