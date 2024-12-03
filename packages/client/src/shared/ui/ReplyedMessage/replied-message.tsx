import { useAppDispatch } from '@/shared/lib/hooks'
import type { IMessageRes, IResponded } from '@/shared/types'
import { FaArrowTurnDown } from 'react-icons/fa6'
import { RxCross2 } from 'react-icons/rx'
import { removeReplyMessage } from './model'
import styles from './replied-message.module.sass'

export const RepliedMessage = (message: (IMessageRes & { isCreate?: boolean }) | IResponded) => {
	const { content, user, id: messageId, isCreate } = message as IMessageRes & { isCreate?: boolean }
	const dispatch = useAppDispatch()
	const handleCloseReplyMessage = () => {
		dispatch(removeReplyMessage(messageId))
	}
	return (
		<div className={styles.message}>
			<div className={styles.message_header}>
				{user?.userLogin || (message as IResponded).parentMessage.user.userLogin} сказал(а): <FaArrowTurnDown />
			</div>
			<hr className={styles.message_hr} />
			<div className={styles.message_content}>{content || (message as IResponded).parentMessage.content}</div>
			{isCreate ? (
				<button
					type='button'
					className={styles.message_replie_close}
					onClick={handleCloseReplyMessage}
				>
					<RxCross2 />
				</button>
			) : null}
		</div>
	)
}
