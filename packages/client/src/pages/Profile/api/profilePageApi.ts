import { GET_USERS, rootApi } from '@/shared/api'
import type { IUser } from '@/shared/types'

const profilePageApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfilePage: builder.query<IUser, string | undefined>({
			query: (username) => `${GET_USERS}/username/${username}`,
			keepUnusedDataFor: 0,
		}),
	}),
})

export const { useGetProfilePageQuery } = profilePageApi
