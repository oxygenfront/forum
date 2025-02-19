import { useGetMessageByIdQuery } from '@/features/CreateMessage/api'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import type { IMessageRes } from '@/shared/types'
import { RepliedMessage } from '@/shared/ui'
import { addReplyMessage, selectReply } from '@/shared/ui/ReplyedMessage'
import classNames from 'classnames'
import { type ChangeEvent, FC, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import styles from './create-message.module.sass'
import { selectMessage, setValue } from './model'

interface ICreateMessageProps {
	onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
	placeholder?: string
}

export const CreateMessage: FC<ICreateMessageProps> = ({ onKeyDown, placeholder }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const previousMessage = useRef<IMessageRes | null>(null)

	const dispatch = useAppDispatch()

	const { replyMessageId, replyMessages, chatReplyMessages } = useAppSelector(selectReply)
	const selectData = useAppSelector(selectMessage)

	const { data: messageById, isSuccess } = useGetMessageByIdQuery(replyMessageId, { skip: replyMessageId === '' })

	useEffect(() => {
		if (messageById && replyMessageId && isSuccess && previousMessage.current !== messageById) {
			dispatch(addReplyMessage(messageById))
			previousMessage.current = messageById
		}
	}, [replyMessageId, messageById, isSuccess, dispatch])

	const [isFocused, setIsFocused] = useState(false)

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
			<div>
				{replyMessages.length
					? replyMessages.map((replyMessage) => (
							<RepliedMessage
								key={replyMessage.id}
								isCreate={true}
								{...replyMessage}
							/>
						))
					: chatReplyMessages.length
						? chatReplyMessages.map((replyMessage) => (
								<RepliedMessage
									key={replyMessage.id}
									isCreate={true}
									{...replyMessage}
								/>
							))
						: null}
			</div>
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
				placeholder={placeholder || 'Написать комментарий...'}
			/>
		</div>
	)
}
