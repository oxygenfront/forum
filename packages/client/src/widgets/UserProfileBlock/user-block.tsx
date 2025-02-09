import { ROLES_UI } from '@/shared/constants'
import { timeSincePublication } from '@/shared/lib'
import type { IUser } from '@/shared/types'
import classNames from 'classnames'
import type { FC } from 'react'
import styles from './userblock.module.sass'

export const UserBlock: FC<
	Pick<IUser, 'userImage' | 'avatarColor' | 'role' | 'userLogin' | 'createdAt' | 'themeMessagesCount'>
> = ({ userImage, avatarColor, userLogin, role, createdAt, themeMessagesCount }) => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.user}>
					{userImage ? (
						<img
							src={userImage}
							alt='user avatar'
							className={styles.user_img}
						/>
					) : (
						<div>{avatarColor}</div>
					)}
					<p className={classNames(styles.status_online, styles.isOnline)}>Онлайн</p>
				</div>
				<div className={styles.about}>
					<div className={styles.up}>
						<div className={styles.up_left}>
							<div className={styles.username}>{userLogin}</div>
							<div className={styles.status_site}>Не проверен</div>
						</div>
						<div className={styles.up_right}>
							<button
								type='button'
								className={styles.button}
							>
								Посмотреть профиль
							</button>
						</div>
					</div>
					<div className={styles.middle}>
						<p className={styles.about_block}>Роль пользователя</p>
						<p className={styles.role}>{ROLES_UI[role.toUpperCase() as keyof typeof ROLES_UI]}</p>
					</div>
					<div className={styles.bottom}>
						<div className={styles.bottom_left}>
							<div className={styles.bottom_left_item}>
								<div className={styles.about_block}>Комментарии</div>
								<div className={styles.bottom_left_item_content}>{themeMessagesCount}</div>
							</div>
							<hr className={styles.hr} />
							<div className={styles.bottom_left_item}>
								<div className={styles.about_block}>Регистрация</div>
								<div className={styles.bottom_left_item_content}>
									{timeSincePublication(createdAt, { isProfile: true })}
								</div>
							</div>
							<hr className={styles.hr} />
							<div className={styles.bottom_left_item}>
								<div className={styles.about_block}>Реакции</div>
								<div className={styles.bottom_left_item_content}>210</div>
							</div>
						</div>
						<div className={styles.bottom_right}>
							<button
								type='button'
								className={styles.button}
							>
								Отмена
							</button>
							<button
								type='button'
								className={classNames(styles.button, styles.save)}
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
