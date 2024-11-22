import styles from './message.module.sass'

import { type IMessage, ROLES } from '@/shared/model'
import { type FC } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'

export const Message: FC<IMessage> = (message) => {
	const { content, user, userId } = message
	return (
		<div className={styles.container}>
			<div className={styles.user_wrapper}>
				<div className={styles.user}>
					<img
						src={user.userImage}
						alt='Аватар'
						className={styles.user_img}
					/>
					<div className={styles.user_desc}>
						<div className={styles.user_name}>{user.userLogin}</div>
						<div className={styles.user_role}>{user.id === userId ? ROLES.SELLER : 'user'}</div>
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
