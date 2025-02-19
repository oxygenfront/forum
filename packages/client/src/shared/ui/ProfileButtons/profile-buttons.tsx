import styles from './profile-buttons.module.sass'
export const ProfileButtons = () => {
	return (
		<div className={styles.profile}>
			<li className={''}>
				<button
					className={styles.profile_btn__active}
					type={'button'}
				>
					Стена
				</button>
			</li>
			<li>
				<button
					className={styles.profile_btn}
					type={'button'}
				>
					Недавняя активность
				</button>
			</li>
			<span className={styles.profile_hr}></span>
			<li>
				<button
					className={styles.profile_btn}
					type={'button'}
				>
					Контент
				</button>
			</li>
		</div>
	)
}
