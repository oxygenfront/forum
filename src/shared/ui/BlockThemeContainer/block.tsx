import { ModalSort } from '@/features/ModalSort'
import type { FC } from 'react'
import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './block.module.sass'
interface BlockThemeContainer {
	title: string
	username: string
	date_create: string
	count_views: number
	count_messages: number
}

export const BlockThemeContainer: FC<BlockThemeContainer> = ({
	title,
	count_messages,
	count_views,
	date_create,
	username,
}) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.left}>
					<p className={styles.title}>{title}</p>
					<div className={styles.about}>
						<div className={styles.user}>
							<span className={styles.avatar}>Г</span>
							<div className={styles.name}>{username}</div>
						</div>
						<div className={styles.dot} />
						<div className={styles.date_create}>{date_create}</div>
					</div>
				</div>
				<div className={styles.right}>
					<ModalSort arrayTitles={[]} />
					<div className={styles.about}>
						<div className={styles.views}>{count_views} просмотров</div>
						<div className={styles.dot} />
						<div className={styles.messages}>
							<PiWechatLogoBold />
							{count_messages}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
