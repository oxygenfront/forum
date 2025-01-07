import { timeSincePublication } from '@/shared/lib/helpers'
import type { IUserLessData } from '@/shared/types'
import classNames from 'classnames'
import type { FC } from 'react'
import { CiLock, CiUnlock } from 'react-icons/ci'
import { PiWechatLogoBold } from 'react-icons/pi'
// import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './block.module.sass'

interface BlockThemeContainer {
	title: string
	createdAt: Date
	views: number
	countThemeMessages: number
	flag: boolean
	isPrivate: boolean
	isChat: boolean
	isImportant: boolean
	user: Omit<IUserLessData, 'userPassword'>
}

type BlockThemeContainerProps = Partial<BlockThemeContainer>

export const BlockThemeContainer: FC<BlockThemeContainerProps> = ({
	title,
	countThemeMessages,
	views,
	createdAt,
	user,
	flag,
	isImportant,
	isChat,
	isPrivate,
}) => {
	return (
		<>
			{isChat ? (
				<div className={styles.container}>
					<div className={classNames(styles.up, { [styles.chat]: isChat })}>
						<div className={styles.chat_info}>
							<p className={styles.title}>{title}</p>
							<span className={styles.dot} />
							<div className={classNames(styles.plate, { [styles.chat]: isChat })}>
								<span
									className={classNames(styles.naming, { [styles.chat]: isChat })}
								>{`${isImportant ? 'Важные' : 'Неважные'}`}</span>
							</div>
						</div>
						<button
							className={styles.exit}
							type='button'
						>
							Покинуть чат
						</button>
					</div>
					{user && createdAt && (
						<div className={classNames(styles.down, { [styles.chat]: isChat })}>
							<div className={styles.user}>
								{user.userImage ? (
									<img
										src={user.userImage}
										alt='Аватар'
										className={styles.avatar}
									/>
								) : (
									<div
										style={{ backgroundColor: user.avatarColor }}
										className={classNames(styles.user_img, styles.noImg)}
									>
										{'userLogin' in user && user.userLogin[0]}
									</div>
								)}
								<div className={styles.name}>{user.userLogin}</div>
							</div>
							<div className={styles.date_create}>{timeSincePublication(createdAt, isChat)}</div>
						</div>
					)}
				</div>
			) : (
				<div className={styles.container}>
					<div className={classNames(styles.up, { [styles.flag]: !flag })}>
						<p className={styles.title}>{title}</p>
						{flag && (
							<div className={styles.plate}>
								{isPrivate ? <CiLock className={styles.imgLocked} /> : <CiUnlock className={styles.imgLocked} />}
								<span className={styles.naming}>{`${isPrivate ? 'Закрыто' : 'Открыто'}`}</span>
							</div>
						)}
					</div>
					{flag && createdAt && user && (
						<div className={styles.down}>
							<div className={styles.user}>
								{user.userImage ? (
									<img
										src={user.userImage}
										alt='Аватар'
										className={styles.avatar}
									/>
								) : (
									<div
										style={{ backgroundColor: user.avatarColor }}
										className={classNames(styles.avatar, styles.noImg)}
									>
										{user.userLogin[0]}
									</div>
								)}
								<div className={styles.name}>{user.userLogin}</div>
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
			)}
		</>
	)
}
