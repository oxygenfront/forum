import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Input, InputPassword } from '@/shared/ui'
import { type FC } from 'react'
import styles from './login.module.sass'
import { selectRememberMe, setRememberMe } from './model'

export const Login: FC = () => {
	const dispatch = useAppDispatch()
	const rememberMe = useAppSelector(selectRememberMe)

	function handleRememberMe() {
		dispatch(setRememberMe(!rememberMe))
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
