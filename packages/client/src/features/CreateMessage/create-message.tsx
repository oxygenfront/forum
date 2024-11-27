import { selectUserData } from '@/features/Auth'
import { CustomTextarea } from '@/features/CustomTextArea'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import { FC, KeyboardEvent } from 'react'
import { useCreateMessageMutation, useUpdateMessageMutation } from './api'
import styles from './create-message.module.sass'
import { selectMessage, setValue } from './model'

interface ICreateMessageProps {
	themeId: string
}

export const CreateMessage: FC<ICreateMessageProps> = ({ themeId }) => {
	const selectDataMessage = useAppSelector(selectMessage)
	const { id: userId } = useAppSelector(selectUserData)
	const dispatch = useAppDispatch()

	const [createMessage, { isSuccess: isSuccessCreate }] = useCreateMessageMutation()
	const [updateMessage, { isSuccess: isSuccessUpdate }] = useUpdateMessageMutation()

	const dataMessage = {
		content: selectDataMessage.content,
		themeId,
		userId: userId,
	}

	const handleActionMessage = () => {
		if (selectDataMessage.isEdit) {
			updateMessage({
				id: selectDataMessage.messageId,
				content: selectDataMessage.content,
			})
		} else {
			createMessage(dataMessage)
		}
	}

	const handleCancelEdit = () => {
		dispatch(setValue({ isEdit: false, content: '' }))
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleActionMessage()
		}
	}

	return (
		<div className={styles.wrapper}>
			<CustomTextarea
				isSuccessCreate={isSuccessCreate}
				isSuccessUpdate={isSuccessUpdate}
				onKeyDown={handleKeyDown}
			/>
			<div className={styles.button_wrapper}>
				{selectDataMessage.isEdit && (
					<button
						type='button'
						className={styles.button}
						onClick={handleCancelEdit}
					>
						Отменить редактирование
					</button>
				)}
				<button
					type='button'
					className={styles.button}
					onClick={handleActionMessage}
				>
					{selectDataMessage.isEdit ? 'Редактировать' : 'Комментировать'}
				</button>
			</div>
		</div>
	)
}
