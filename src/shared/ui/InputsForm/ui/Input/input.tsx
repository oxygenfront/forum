import { changeData, selectForms } from '@/entities/Forms'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { InputProps, InputValue } from '@/shared/model'
import { useRenderHint } from '@/shared/ui/InputsForm/lib/useRenderHint'
import { selectHint } from '@/shared/ui/InputsForm/model/selector'
import classNames from 'classnames'
import type { ChangeEvent, FC } from 'react'
import styles from './input.module.sass'

export const Input: FC<InputProps> = ({ label, placeholder, id, type }) => {
	const dispatch = useAppDispatch()
	const hint = useAppSelector(selectHint)
	const value = useAppSelector(selectForms)[type]
	const { renderHint, isError } = useRenderHint({ hintForType: hint[type], id })
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
				className={classNames(styles.input, { [styles.isError]: isError })}
				onChange={changeValueInput}
				placeholder={placeholder}
				value={inputValue}
			/>
			{renderHint()}
		</div>
	)
}
