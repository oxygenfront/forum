import { ModalSort } from '@/features/ModalSort'
import classNames from 'classnames'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { FC } from 'react'
import { LuLock } from 'react-icons/lu'
import { PiWechatLogoBold } from 'react-icons/pi'

import dayjs from 'dayjs'
import styles from './block.module.sass'
interface BlockThemeContainer {
	title: string
	username: string
	// biome-ignore lint/style/useNamingConvention: <explanation>
	date_create: number
	// biome-ignore lint/style/useNamingConvention: <explanation>
	count_views: number
	// biome-ignore lint/style/useNamingConvention: <explanation>
	count_messages: number
	flag: boolean
}
dayjs.extend(relativeTime)

export const BlockThemeContainer: FC<BlockThemeContainer> = ({
	title,
	count_messages,
	count_views,
	date_create,
	username,
	flag,
}) => {
	const timeSincePublication = (unix: number) => {
		return dayjs(unix * 1000)
			.locale('ru-ru')
			.fromNow()
	}
	return (
		<>
			<div className={styles.container}>
				<div className={classNames(styles.up, { [styles.flag]: !flag })}>
					<div className={styles.lockWithTitle}>
						<p className={styles.title}>{title}</p>
						{flag && (<div className={styles.locked}>
							<LuLock className={styles.imgLocked} />
							<span className={styles.naming}>Закрыто</span>
						</div>)}
					</div>
					<ModalSort arrayTitles={[]} />
				</div>
				{flag && (
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
