import { ProfilePost } from '@/shared/ProfilePost'
import { ProfileTop } from '@/shared/ui/ProfileWallTop/profile-top'
import styles from './profile-wall.module.sass'
export const ProfileWall = () => {
	return (
		<div className={styles.wall}>
			<ProfileTop />

			<div className={styles.wall_midle}>
				<img
					className={styles.wall_midle__img}
					alt={''}
					src={''}
				/>
				<div className={styles.wall_midle__main}>
					<input
						type={'text'}
						className={styles.wall_midle__input}
						placeholder={'Обновить свой статус'}
					/>
					<span className={styles.wall_midle__line} />
					<button
						className={styles.wall_midle__btn}
						type={'button'}
					>
						Отправить
					</button>
				</div>
			</div>
			<span className={styles.wall_line} />
			<ProfilePost />
		</div>
	)
}
