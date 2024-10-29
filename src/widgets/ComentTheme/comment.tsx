import styles from './comment.module.sass'

import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'
export const CommentTheme = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<div className={styles.user}>
						<div className={styles.imgProfile} />
						<div className={styles.userDesc}>
							<div className={styles.desc}>Я съел собаку</div>
							<div className={styles.role}>Админ</div>
						</div>
					</div>
					<div className={styles.mainText}>
						Каждый из нас понимает очевидную вещь: социально-экономическое развитие создаёт необходимость включения в
						производственный план целого ряда внеочередных мероприятий с учётом комплекса дальнейших направлений
						развития. Сложно сказать, почему реплицированные с зарубежных источников, современные исследования
						представлены в исключительно положительном свете.
					</div>
				</div>
				<div className={styles.down}>
					<div className={styles.marks}>
						<div className={styles.likes}>
							<AiOutlineLike className={styles.iconLike} />
							<span>103</span>
						</div>
						<div className={styles.dislike}>
							<AiOutlineDislike className={styles.iconLike} />
							<span>103</span>
						</div>
					</div>
					<div className={styles.button}>
						<FaArrowTurnDown className={styles.btnImg} />
						<span className={styles.btnText}>Ответить</span>
					</div>
				</div>
			</div>
		</>
	)
}
