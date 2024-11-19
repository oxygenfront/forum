import type { FC } from 'react'
import { GoDotFill } from 'react-icons/go'
import styles from './review-item.module.sass'

export const ReviewItem: FC = () => {
	return (
		<a
			href='#...'
			className={styles.wrapper}
		>
			<div className={styles.review}>
				<img
					className={styles.review_avatar}
					src='/images/avatar.png'
					alt='Аватар пользователя'
				/>
				<div className={styles.review_main}>
					<div className={styles.review_text}>Я ебанный задрот в доту</div>
					<div className={styles.review_info}>
						Последнее: Oxygen <GoDotFill />
						<span>1 час назад</span>
					</div>
				</div>
			</div>
		</a>
	)
}
