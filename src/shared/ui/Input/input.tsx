import { changeData, selectData } from '@/entities/Forms/FormsData'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { ChangeEvent, FC } from 'react'
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

interface InputProps {
	label: string
	placeholder: string
	id: string
	type: 'login' | 'register' | 'forgot'
}

export const Input: FC<InputProps> = ({ label, placeholder, id, type }) => {
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
			<input
				type='text'
				id={id}
				className={styles.input}
				onChange={changeValueInput}
				placeholder={placeholder}
				value={inputValue}
			/>
		</div>
	)
}
