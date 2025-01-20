import { ROLES } from '@/shared/constants'
import { createSlice } from '@reduxjs/toolkit'

type TUserData = {
	id: string
	userEmail: string
	role: ROLES
	userLogin: string
	userImage?: string
	avatarColor?: string
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
			userData.avatarColor = payload.avatarColor
		},
		setIsLogin: (state, { payload }) => {
			state.isLogin = payload
		},
		clearUserData: (state: IResponseUser) => {
			state.isLogin = false
			state.userData = {
				userImage: initialState.userData.userImage,
				role: initialState.userData.role,
				userEmail: initialState.userData.userEmail,
				userLogin: initialState.userData.userLogin,
				id: initialState.userData.id,
				avatarColor: initialState.userData.avatarColor,
			}
		},
	},
})

export const { setUserData, setIsLogin, clearUserData } = userSlice.actions
