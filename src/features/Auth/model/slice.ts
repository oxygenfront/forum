import type { ROLES } from '@/shared/model'
import { createSlice } from '@reduxjs/toolkit'

type TUserData = {
	id: null | number
	email: null | string
	role: null | ROLES
	userLogin: null | string
	userImage: null | string
}

type IResponseUser = {
	isLogin: null | boolean
	userData: TUserData
}

const initialState: IResponseUser = {
	isLogin: false,
	userData: { id: null, email: null, role: null, userLogin: null, userImage: null },
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUserData: ({ userData }, { payload }: { payload: TUserData }) => {
			userData.email = payload.email
			userData.id = payload.id
			userData.userLogin = payload.userLogin
			userData.role = payload.role
			userData.userImage = payload.userImage
		},
		setIsLogin: (state, { payload }) => {
			state.isLogin = payload
		},
	},
})

export const { setUserData, setIsLogin } = userSlice.actions
