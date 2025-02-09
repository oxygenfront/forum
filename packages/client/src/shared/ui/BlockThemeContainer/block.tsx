import { ModalOptions } from '@/features/ModalSort'
import { timeSincePublication } from '@/shared/lib/helpers'
import type { IUserLessData } from '@/shared/types'
import classNames from 'classnames'
import { type FC, ReactNode } from 'react'
import { CiLock, CiUnlock } from 'react-icons/ci'
import { PiWechatLogoBold } from 'react-icons/pi'
// import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './block.module.sass'

interface BlockThemeContainer {
	title: string
	createdAt: Date
	views: number
	countMessages: number
	flag: boolean
	isPrivate: boolean
	isChat: boolean
	isImportant: boolean
	user: Omit<IUserLessData, 'userPassword'>
	actionMoveFromChat?: () => void
	arrayActions?: ReactNode[]
}

type BlockThemeContainerProps = Partial<Omit<BlockThemeContainer, 'actionMoveFromChat'>> &
	Pick<BlockThemeContainer, 'actionMoveFromChat'>

export const BlockThemeContainer: FC<BlockThemeContainerProps> = ({
	title,
	countMessages,
	views,
	createdAt,
	user,
	flag,
	isImportant: _isImportant,
	isChat,
	isPrivate,
	actionMoveFromChat,
	arrayActions,
}) => {
	return (
		<>
			{isChat ? (
				<div className={styles.container}>
					<div className={classNames(styles.up, { [styles.chat]: isChat })}>
						<div className={styles.chat_info}>
							<p className={styles.title}>{title}</p>
							{/*<span className={styles.dot} />*/}
							{/*<div className={classNames(styles.plate, { [styles.chat]: isChat })}>*/}
							{/*	<span*/}
							{/*		className={classNames(styles.naming, { [styles.chat]: isChat })}*/}
							{/*	>{`${isImportant ? 'Важные' : 'Неважные'}`}</span>*/}
							{/*</div>*/}
						</div>
						<button
							className={styles.exit}
							type='button'
							onClick={() => (actionMoveFromChat as () => void)()}
						>
							Покинуть чат
						</button>
					</div>
					{createdAt && (
						<div className={styles.down}>
							<div className={classNames(styles.left, { [styles.chat]: isChat })}>
								{user && (
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
												className={classNames(styles.avatar)}
											>
												{'userLogin' in user && user.userLogin[0].toUpperCase()}
											</div>
										)}
										<div className={styles.name}>{user.userLogin}</div>
									</div>
								)}
								<div className={styles.date_create}>{timeSincePublication(createdAt, { isChat })}</div>
							</div>
							{arrayActions && <ModalOptions arrayActions={arrayActions} />}
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
									{countMessages}
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}
