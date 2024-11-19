import { ModalSort } from '@/features/ModalSort'
import { timeSincePublication } from '@/shared/lib/helpers'
import classNames from 'classnames'
import type { FC } from 'react'
import { LuLock } from 'react-icons/lu'
import { PiWechatLogoBold } from 'react-icons/pi'
// import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './block.module.sass'
interface BlockThemeContainer {
	title?: string
	username?: string
	date_create?: number
	count_views?: number
	count_messages?: number
	flag?: boolean
}

export const BlockThemeContainer: FC<BlockThemeContainer> = ({
	title,
	count_messages,
	count_views,
	date_create,
	username,
	flag,
}) => {
	return (
		<>
			<div className={styles.container}>
				<div className={classNames(styles.up, { [styles.flag]: !flag })}>
					<div className={styles.lockWithTitle}>
						<p className={styles.title}>{title}</p>
						{flag && (
							<div className={styles.locked}>
								<LuLock className={styles.imgLocked} />
								<span className={styles.naming}>Закрыто</span>
							</div>
						)}
					</div>
					<ModalSort arrayTitles={[]} />
				</div>
				{flag && date_create && (
					<div className={styles.down}>
						<div className={styles.user}>
							<span className={styles.avatar}>Г</span>
							<div className={styles.name}>{username}</div>
							<div className={styles.dot} />
							<div className={styles.date_create}>{timeSincePublication(date_create)}</div>
						</div>

						<div className={styles.about}>
							<div className={styles.views}>{count_views} просмотров</div>
							<div className={styles.dot} />
							<div className={styles.messages}>
								<PiWechatLogoBold />
								{count_messages}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
