import { selectMessage, setValue } from '@/features/CreateMessage'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import classNames from 'classnames'
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { RxFontBold, RxFontItalic, RxUnderline } from 'react-icons/rx'
import styles from './custom-textarea.module.sass'

interface ICustomTextAreaProps {
	onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
	isSuccessCreate: boolean
	isSuccessUpdate: boolean
}
export const CustomTextarea: FC<ICustomTextAreaProps> = ({ onKeyDown, isSuccessUpdate, isSuccessCreate }) => {
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

	useEffect(() => {
		if (isSuccessUpdate || isSuccessCreate) {
			dispatch(setValue({ content: '', isEdit: false }))
		}
	}, [isSuccessUpdate, isSuccessCreate])

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
			<div className={styles.header}>
				<div className={styles.header__icons}>
					<button
						type='button'
						className={styles.iconButton}
					>
						<RxFontBold />
					</button>
					<button
						type='button'
						className={styles.iconButton}
					>
						<RxFontItalic />
					</button>
					<button
						type='button'
						className={styles.iconButton}
					>
						<RxUnderline />
					</button>
				</div>
			</div>
			<div className={styles.textareaWrapper}>
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
		</div>
	)
}
