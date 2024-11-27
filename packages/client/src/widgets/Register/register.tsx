import { Input, InputPassword } from '@/shared/ui'
import { type FC } from 'react'

export const Register: FC = () => {
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
