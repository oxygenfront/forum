import { changeData, selectForms } from '@/entities/Forms'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { InputProps, InputValue } from '@/shared/model'
import { type ChangeEvent, type FC, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import styles from './input.module.sass'

export const InputPassword: FC<InputProps> = ({ label, placeholder, id, type }) => {
	const [isVisiblePass, setIsVisiblePass] = useState(false)
	const dispatch = useAppDispatch()
	const value = useAppSelector(selectForms)[type]

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
