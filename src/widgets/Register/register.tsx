import { selectForms } from '@/entities/Forms'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Input, InputPassword } from '@/shared/ui'
import { setHint } from '@/shared/ui/InputsForm'
import { selectHint } from '@/shared/ui/InputsForm/model/selector'
import { type FC, useEffect } from 'react'

interface IRegisterProps {
	isErrorRegister: boolean
}

export const Register: FC<IRegisterProps> = ({ isErrorRegister }) => {
	const dispatch = useAppDispatch()
	const value = useAppSelector(selectForms)
	const { register: storeRegisterData } = useAppSelector(selectForms)
	const hint = useAppSelector(selectHint)
	useEffect(() => {
		if (isErrorRegister) {
			dispatch(setHint({ type: 'register', key: 'userEmail', status: true, hintKey: 'userAlreadyRegistered' }))
		}
	}, [isErrorRegister])
	useEffect(() => {
		if (value.register.userConfirmPassword !== value.register.userPassword) {
			dispatch(setHint({ type: 'register', key: 'userConfirmPassword', status: true, hintKey: 'passwordsDoNotMatch' }))
			dispatch(setHint({ type: 'register', key: 'userPassword', status: true, hintKey: 'passwordsDoNotMatch' }))
		} else {
			dispatch(setHint({ type: 'register', key: 'userConfirmPassword', status: false, hintKey: null }))
			dispatch(setHint({ type: 'register', key: 'userPassword', status: false, hintKey: null }))
		}
	}, [value.register.userConfirmPassword, value.register.userPassword])

	useEffect(() => {
		if (hint.register.userLogin.status || hint.register.userEmail.status) {
			if (storeRegisterData.userLogin === '') {
				dispatch(setHint({ type: 'register', key: 'userLogin', status: true, hintKey: 'isEmptyLogin' }))
			} else {
				dispatch(setHint({ type: 'register', key: 'userLogin', status: false, hintKey: null }))
			}

			if (storeRegisterData.userEmail === '') {
				dispatch(setHint({ type: 'register', key: 'userEmail', status: true, hintKey: 'isEmptyEmail' }))
			} else {
				dispatch(setHint({ type: 'register', key: 'userEmail', status: false, hintKey: null }))
			}
		}
	}, [
		hint.register.userLogin.status,
		hint.register.userEmail.status,
		value.register.userEmail,
		value.register.userLogin,
	])

	return (
		<>
			<Input
				label='Логин'
				placeholder='Введите свой логин...'
				id='userLogin'
				type='register'
			/>
			<Input
				label='Электронная почта'
				placeholder='Введите почту...'
				id='userEmail'
				type='register'
			/>
			<InputPassword
				label='Пароль'
				placeholder='Придумайте пароль...'
				id='userPassword'
				type='register'
			/>
			<InputPassword
				label='Повторите пароль'
				placeholder='Повторите пароль...'
				id='userConfirmPassword'
				type='register'
			/>
		</>
	)
}
