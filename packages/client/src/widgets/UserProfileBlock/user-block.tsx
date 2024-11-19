import classNames from 'classnames'
import styles from './userblock.module.sass'
export const UserBlock = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.user}>
					<img
						src='https://img.freepik.com/free-vector/girl-with-red-eyes_603843-3008.jpg'
						alt='user avatar'
						className={styles.user_img}
					/>
					<p className={classNames(styles.status_online, styles.isOnline)}>Онлайн</p>
				</div>
				<div className={styles.about}>
					<div className={styles.up}>
						<div className={styles.up_left}>
							<div className={styles.username}>Username</div>
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
						<p className={styles.role}>Пользователь</p>
					</div>
					<div className={styles.bottom}>
						<div className={styles.bottom_left}>
							<div className={styles.bottom_left_item}>
								<div className={styles.about_block}>Комментарии</div>
								<div className={styles.bottom_left_item_content}>0</div>
							</div>
							<hr className={styles.hr} />
							<div className={styles.bottom_left_item}>
								<div className={styles.about_block}>Регистрация</div>
								<div className={styles.bottom_left_item_content}>10.10.21</div>
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
