import { changeData, selectData } from '@/entities/Forms/FormsData'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { type ChangeEvent, type FC, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import styles from './input.module.sass'

type InputValue = ILogin | IRegister | IForgot

interface ILogin {
	userLogin: string
	userPassword: string
}
interface IRegister {
	userLogin: string
	userEmail: string
	userPassword: string
	userConfirmPassword: string
}
interface IForgot {
	userEmail: string
}

interface InputPasswordProps {
	label: string
	placeholder: string
	id: string
	type: 'login' | 'register' | 'forgot'
}

export const InputPassword: FC<InputPasswordProps> = ({ label, placeholder, id, type }) => {
	const [isVisiblePass, setIsVisiblePass] = useState(false)
	const dispatch = useAppDispatch()
	const value = useAppSelector(selectData)[type]

	const changeValueInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value: inputValue } = event.target
		dispatch(
			changeData({
				type,
				payload: {
					[id]: inputValue,
				},
			}),
		)
	}
	const inputValue = value[id as keyof InputValue]

	return (
		<div className={styles.wrapper_input}>
			<label
				htmlFor={id}
				className={styles.label}
			>
				{label}
			</label>
			<div className={styles.password}>
				<input
					type={isVisiblePass ? 'text' : 'password'}
					id={id}
					className={styles.input}
					placeholder={placeholder}
					value={inputValue}
					onChange={changeValueInput}
				/>
				<button
					type='button'
					className={styles.visible}
					onClick={() => setIsVisiblePass(!isVisiblePass)}
				>
					{isVisiblePass ? <FaEye /> : <FaEyeSlash />}
				</button>
			</div>
		</div>
	)
}
