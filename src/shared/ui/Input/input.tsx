import { changeData, selectForms } from '@/entities/Forms'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { InputProps, InputValue } from '@/shared/model'
import type { ChangeEvent, FC } from 'react'
import styles from './input.module.sass'

export const Input: FC<InputProps> = ({ label, placeholder, id, type }) => {
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
