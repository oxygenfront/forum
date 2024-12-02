import { ROLES } from '@/shared/constants'
import { createSlice } from '@reduxjs/toolkit'

type TUserData = {
	id: string
	userEmail: string
	role: ROLES
	userLogin: string
	userImage?: string
}

type IResponseUser = {
	isLogin: boolean
	userData: TUserData
}

const initialState: IResponseUser = {
	isLogin: false,
	userData: { id: '', userEmail: '', role: ROLES.USER, userLogin: '' },
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUserData: ({ userData }, { payload }: { payload: TUserData }) => {
			userData.id = payload.id
			userData.role = payload.role
			userData.userEmail = payload.userEmail
			userData.userLogin = payload.userLogin
			userData.userImage = payload.userImage
		},
		setIsLogin: (state, { payload }) => {
			state.isLogin = payload
		},
	},
})

export const { setUserData, setIsLogin } = userSlice.actions
