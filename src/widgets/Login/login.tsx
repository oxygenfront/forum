import { selectForms } from '@/entities/Forms'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Input, InputPassword } from '@/shared/ui'
import { setHint } from '@/shared/ui/InputsForm'
import { selectHint } from '@/shared/ui/InputsForm/model/selector'
import { selectRememberMe, setRememberMe } from '@/widgets/Login/model'
import { type FC, useEffect } from 'react'
import styles from './login.module.sass'
interface ILoginProps {
	isErrorLogin: boolean
}
export const Login: FC<ILoginProps> = ({ isErrorLogin }) => {
	const dispatch = useAppDispatch()
	const { login: storeLoginData } = useAppSelector(selectForms)
	const value = useAppSelector(selectForms)
	const hint = useAppSelector(selectHint)
	const rememberMe = useAppSelector(selectRememberMe)

	useEffect(() => {
		if (isErrorLogin) {
			dispatch(setHint({ type: 'login', key: 'userPassword', status: true, hintKey: 'incorrectLogin' }))
			dispatch(setHint({ type: 'login', key: 'userEmail', status: true, hintKey: 'incorrectLogin' }))
		}
	}, [isErrorLogin])

	useEffect(() => {
		if ((hint.login.userLogin.status || hint.login.userPassword.status) && !isErrorLogin) {
			if (storeLoginData.userEmail === '') {
				dispatch(setHint({ type: 'login', key: 'userEmail', status: true, hintKey: 'isEmptyEmail' }))
			} else {
				dispatch(setHint({ type: 'login', key: 'userEmail', status: false, hintKey: null }))
			}

			if (storeLoginData.userPassword === '') {
				dispatch(setHint({ type: 'login', key: 'userPassword', status: true, hintKey: 'isEmptyPassword' }))
			} else {
				dispatch(setHint({ type: 'login', key: 'userPassword', status: false, hintKey: null }))
			}
		}
	}, [hint.login.userLogin.status, hint.login.userPassword.status, value.login.userEmail, value.login.userPassword])

	function handleRememberMe() {
		dispatch(setRememberMe())
	}

	return (
		<>
			<Input
				label='Почта'
				placeholder='Введите свою почту...'
				id='userEmail'
				type='login'
			/>
			<InputPassword
				label='Пароль'
				placeholder='Введите свой пароль...'
				id='userPassword'
				type='login'
			/>
			<label className={styles.remember}>
				<input
					type='checkbox'
					id='remember'
					checked={rememberMe}
					onChange={handleRememberMe}
				/>
				<span className={styles.checkmark} />
				Запомнить меня
			</label>
		</>
	)
}
