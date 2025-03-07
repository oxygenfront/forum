import { ModalOptions } from '@/features/ModalSort'
import { AiFillLike } from 'react-icons/ai'
import { PiArrowBendDoubleUpLeft } from 'react-icons/pi'
import styles from './profile-post.module.sass'

export const ProfilePost = () => {
	return (
		<div className={styles.post}>
			<div className={styles.post_info}>
				<img
					className={styles.post_img}
					alt={''}
					src={''}
				/>
				<div className={styles.post_wrapper}>
					<div className={styles.post_main}>
						<div className={styles.post_main__content}>
							<div className={styles.post_main__userinfo}>
								<span className={styles.post_main__userinfo_username}>てめ</span>
								<hr className={styles.post_main__userinfo_dot} />
								<span className={styles.post_main__userinfo_date}>1 час назад</span>
							</div>
							<div className={styles.post_main_btn}>
								<PiArrowBendDoubleUpLeft />
								<button
									type={'button'}
									className={styles.post_main_btn__answer}
								>
									ответить
								</button>
							</div>
						</div>
						<ModalOptions arrayActions={['Редактировать', 'Удалить']} />
					</div>
					<div className={styles.post_main__desc}>
						<p>Скрывать анимированные аватарки пользователей не лучшее решение бтв</p>
						<AiFillLike />
					</div>
				</div>
			</div>
			<span className={styles.post_line} />
		</div>
	)
}
