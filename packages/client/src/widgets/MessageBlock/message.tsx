import { ROLES } from '@/shared/constants'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IMessage } from '@/shared/types'
import classNames from 'classnames'
import styles from './message.module.sass'

import { Action } from '@/features/Action'
import { selectIsLogin, selectUserData } from '@/features/Auth'
import { setValue, useDeleteMessageMutation } from '@/features/CreateMessage'
import { ModalOptions } from '@/features/ModalSort'
import { type FC } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'

export const Message: FC<IMessage & { userId: string; userThemeId: string }> = (message) => {
	const { content, user, userId: messageUserId, id: messageId, themeId } = message
	const { id: userId } = useAppSelector(selectUserData)
	const isLogin = useAppSelector(selectIsLogin)
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
			{message.user.id === userId && isLogin && (
				<ModalOptions
					arrayActions={[
						<Action
							nameAction='Редактировать'
							action={handleUpdateMessage}
							key={`edit-${messageId}`}
						/>,
						<Action
							nameAction='Удалить'
							action={handleDeleteMessage}
							key={`delete-${messageId}`}
						/>,
					]}
				/>
			)}
			<div className={styles.user_wrapper}>
				<div className={styles.user}>
					{user.userImage ? (
						<img
							src={user.userImage}
							alt='Аватар'
							className={styles.user_img}
						/>
					) : (
						<div
							style={{ backgroundColor: message.user.avatarColor }}
							className={classNames(styles.user_img, styles.noImg)}
						>
							{message.user.userLogin[0]}
						</div>
					)}

					<div className={styles.user_name}>{user.userLogin}</div>
					<div className={styles.user_role}>{message.userThemeId === messageUserId ? ROLES.SELLER : ROLES.USER}</div>
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
