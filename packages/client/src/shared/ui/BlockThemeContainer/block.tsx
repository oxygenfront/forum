import { ModalSort } from '@/features/ModalSort'
import { timeSincePublication } from '@/shared/lib/helpers'
import classNames from 'classnames'
import type { FC } from 'react'
import { LuLock } from 'react-icons/lu'
import { PiWechatLogoBold } from 'react-icons/pi'
// import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './block.module.sass'
interface BlockThemeContainer {
	title: string
	userLogin: string
	createdAt: Date
	views: number
	countThemeMessages: number
	flag: boolean
	userImage: string
}

type BlockThemeContainerProps = Partial<BlockThemeContainer>

export const BlockThemeContainer: FC<BlockThemeContainerProps> = ({
	title,
	countThemeMessages,
	views,
	createdAt,
	userLogin,
	userImage,
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
				{flag && createdAt && (
					<div className={styles.down}>
						<div className={styles.user}>
							<img
								src={userImage}
								className={styles.avatar}
								alt='Аватар'
							/>
							<div className={styles.name}>{userLogin}</div>
							<div className={styles.dot} />
							<div className={styles.date_create}>{timeSincePublication(createdAt)}</div>
						</div>

						<div className={styles.about}>
							<div className={styles.views}>{views} просмотров</div>
							<div className={styles.dot} />
							<div className={styles.messages}>
								<PiWechatLogoBold />
								{countThemeMessages}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
