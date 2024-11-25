import styles from './message.module.sass'

import { Action } from '@/features/Action/action.tsx'
import { selectUserData } from '@/features/Auth'
import { useDeleteMessageMutation } from '@/features/CreateMessage/api'
import { setValue } from '@/features/CreateMessage/model'
import { ModalOptions } from '@/features/ModalSort'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import { type IMessage, ROLES } from '@/shared/model'
import { type FC } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'

export const Message: FC<IMessage> = (message) => {
	const { content, user, userId: messageUserId, id: messageId, themeId } = message
	const { id: userId } = useAppSelector(selectUserData)
	const dispatch = useAppDispatch()
	const [deleteMessage] = useDeleteMessageMutation()
	const handleDeleteMessage = () => {
		deleteMessage(messageId)
	}

	const handleUpdateMessage = () => {
		dispatch(setValue({ content, themeId, userId: message.userId, messageId: messageId, isEdit: true }))
	}

	return (
		<div className={styles.container}>
			{message.user.id === userId && (
				<ModalOptions
					arrayActions={[
						<Action
							nameAction='Удалить'
							action={handleDeleteMessage}
							key={`delete-${messageId}`}
						/>,
						<Action
							nameAction='Редактировать'
							action={handleUpdateMessage}
							key={`edit-${messageId}`}
						/>,
					]}
				/>
			)}
			<div className={styles.user_wrapper}>
				<div className={styles.user}>
					<img
						src={user.userImage}
						alt='Аватар'
						className={styles.user_img}
					/>
					<div className={styles.user_desc}>
						<div className={styles.user_name}>{user.userLogin}</div>
						<div className={styles.user_role}>
							{message.userThemeId === messageUserId ? ROLES.SELLER : 'Пользователь'}
						</div>
					</div>
				</div>
				<div className={styles.content}>{content}</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.down}>
				<div className={styles.icons}>
					<button
						type='button'
						className={styles.wrapper_icon}
					>
						<AiOutlineLike />
						<span>103</span>
					</button>
					<button
						type='button'
						className={styles.wrapper_icon}
					>
						<AiOutlineDislike />
						<span>103</span>
					</button>
				</div>
				<button
					type='button'
					className={styles.button}
				>
					<FaArrowTurnDown />
					<span className={styles.btnText}>Ответить</span>
				</button>
			</div>
		</div>
	)
}
