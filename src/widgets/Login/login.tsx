import { Input, InputPassword } from '@/shared/ui'
import type { FC } from 'react'
import styles from './login.module.sass'
export const Login: FC = () => {
	return (
		<>
			<Input
				label='Логин'
				placeholder='Введите свой логин...'
				id='userLogin'
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
				/>
				<span className={styles.checkmark} />
				Запомнить меня
			</label>
		</>
	)
}
