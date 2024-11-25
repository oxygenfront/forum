import { selectMessage, setValue } from '@/features/CreateMessage/model'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { RxFontBold, RxFontItalic, RxUnderline } from 'react-icons/rx'
import styles from './custom-textarea.module.sass'

export const CustomTextarea = ({ themeId }: { themeId: string }) => {
	const dispatch = useAppDispatch()
	const { content } = useAppSelector(selectMessage)

	const [isFocused, setIsFocused] = useState(false)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setValue({ themeId, content: e.target.value, userId: 'f5bbb50d-5008-4892-8bc8-949657aeaa55' }))
	}
	const adjustHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}
	useEffect(() => {
		adjustHeight()
	}, [content])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.header__icons}>
					<button
						type='button'
						// onClick={handleBold}
						className={styles.iconButton}
					>
						<RxFontBold />
					</button>
					<button
						type='button'
						// onClick={handleItalic}
						className={styles.iconButton}
					>
						<RxFontItalic />
					</button>
					<button
						type='button'
						// onClick={handleUnderline}
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
					value={content}
					onChange={handleChange}
					placeholder='Написать комментарий...'
				/>
			</div>
		</div>
	)
}
