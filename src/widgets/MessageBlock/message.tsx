import styles from './message.module.sass'

import { AiOutlineLike } from 'react-icons/ai'
import { AiOutlineDislike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'
export const Message = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.user_wrapper}>
					<div className={styles.user}>
						<div className={styles.user_img} />
						<div className={styles.user_desc}>
							<div className={styles.user_name}>Я съел собаку</div>
							<div className={styles.user_role}>Админ</div>
						</div>
					</div>
					<div className={styles.content}>
						Каждый из нас понимает очевидную вещь: социально-экономическое развитие создаёт необходимость включения в
						производственный план целого ряда внеочередных мероприятий с учётом комплекса дальнейших направлений
						развития. Сложно сказать, почему реплицированные с зарубежных источников, современные исследования
						представлены в исключительно положительном свете.
					</div>
				</div>
				<hr className={styles.hr} />
				<div className={styles.down}>
					<div className={styles.icons}>
						<button
							type='button'
							className={styles.wrapper_icon}
						>
							<AiOutlineLike />
							<span>103</span>
						</button>
						<button
							type='button'
							className={styles.wrapper_icon}
						>
							<AiOutlineDislike />
							<span>103</span>
						</button>
					</div>
					<button
						type='button'
						className={styles.button}
					>
						<FaArrowTurnDown />
						<span className={styles.btnText}>Ответить</span>
					</button>
				</div>
			</div>
		</>
	)
}
