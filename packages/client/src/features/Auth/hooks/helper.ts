import type { IRegister } from '@/shared/model'

export const emptyDataToFetch = (storeRegisterData: IRegister) =>
	Object.values({
		email: storeRegisterData.userEmail,
		userLogin: storeRegisterData.userLogin,
		password: storeRegisterData.userPassword,
	}).every((el) => el === '')
