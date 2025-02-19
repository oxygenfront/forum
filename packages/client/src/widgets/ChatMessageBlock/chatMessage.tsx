import { selectIsLogin, selectUserData } from '@/features/Auth'
import { setValue } from '@/features/CreateMessage'
import { ModalOptions } from '@/features/ModalSort'
import { timeSincePublication } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChatMessage } from '@/shared/types/chat.types'
import { Action } from '@/shared/ui/Action'
import { RepliedMessage } from '@/shared/ui/ReplyedMessage'
import { addChatReplyMessage } from '@/shared/ui/ReplyedMessage/model'
import classNames from 'classnames'
import type { FC } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'
import styles from './message.module.sass'

interface IMessageProps extends IChatMessage {
	isChat?: boolean
	deleteMessageAction: (id: string) => void
}

export const ChatMessage: FC<IMessageProps> = (message) => {
	const { content, user, id: messageId, respondedTo, isChat, createdAt, deleteMessageAction } = message

	const { id: userId } = useAppSelector(selectUserData)
	const isLogin = useAppSelector(selectIsLogin)
	const dispatch = useAppDispatch()

	const handleUpdateMessage = () => {
		dispatch(
			setValue({
				content,
				userId: message.userId,
				messageId: messageId,
				isEdit: true,
			}),
		)
	}

	const handleReplyMessage = () => {
		dispatch(addChatReplyMessage(message))
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
							action={() => deleteMessageAction(messageId)}
							key={`delete-${messageId}`}
						/>,
					]}
				/>
			)}
			{respondedTo?.length
				? respondedTo.map((responded) => (
						<RepliedMessage
							key={responded.id}
							{...responded}
						/>
					))
				: null}
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
							{message.user.userLogin[0].toUpperCase()}
						</div>
					)}

					<div className={styles.user_name}>{user.userLogin}</div>
					{/*<div className={styles.user_role}>{message.userThemeId === messageUserId ? 'Продавец' : 'Пользователь'}</div>*/}
				</div>
				<div className={styles.content}>{content}</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.down}>
				<div className={styles.icons}>
					{isChat ? (
						<span className={styles.created_at}>{timeSincePublication(new Date(createdAt), { isChat })}</span>
					) : (
						<>
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
						</>
					)}
				</div>
				<button
					type='button'
					className={styles.button}
					disabled={!isLogin}
					onClick={handleReplyMessage}
				>
					<FaArrowTurnDown />
					<span className={styles.btnText}>Ответить</span>
				</button>
			</div>
		</div>
	)
}
