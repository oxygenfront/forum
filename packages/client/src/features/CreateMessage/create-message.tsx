import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import classNames from 'classnames'
import { type ChangeEvent, FC, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import styles from './create-message.module.sass'
import { selectMessage, setValue } from './model'

interface ICreateMessageProps {
	onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}
export const CreateMessage: FC<ICreateMessageProps> = ({ onKeyDown }) => {
	const dispatch = useAppDispatch()
	const selectData = useAppSelector(selectMessage)

	const [isFocused, setIsFocused] = useState(false)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setValue({ ...selectData, content: e.target.value }))
	}

	useEffect(() => {
		if (selectData.isEdit && textareaRef.current) {
			textareaRef.current.focus()
		}
	}, [selectData.isEdit, selectData.content])

	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}
	useEffect(() => {
		adjustHeight()
	}, [selectData.content])

	return (
		<div className={styles.wrapper}>
			<textarea
				ref={textareaRef}
				className={classNames(styles.textarea, { [styles.focus]: isFocused })}
				contentEditable
				suppressContentEditableWarning={true}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				onKeyDown={onKeyDown}
				value={selectData.content}
				onChange={handleChange}
				placeholder='Написать комментарий...'
			/>
		</div>
	)
}
