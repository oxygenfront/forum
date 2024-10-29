import type { FC } from 'react'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-item.module.sass'

export const ChapterItem: FC = () => {
	return (
		<Link
			to=''
			className={styles.theme}
		>
			<BsChatText />
			<div className={styles.wrapper}>
				<div className={styles.theme__left}>Гарант-сервис</div>
				<div className={styles.theme__right}>
					<div className={styles.theme__info}>
						<span className={styles.theme__info_item}>
							<MdOutlineEdit />
							Темы<span className={styles.theme__info_count}>49</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.theme__info_item}>
							<PiWechatLogoBold />
							Сообщения<span className={styles.theme__info_count}>50к</span>
						</span>
					</div>
					<div className={styles.user}>
						<img
							src='/images/avatar.png'
							alt='Аватар пользователя'
							className={styles.user_avatar}
						/>
						<div className={styles.user__wrapper}>
							<p className={styles.user_message}>А че реальна?</p>
							<div className={styles.user__info}>
								<div className={styles.user__info_name}>Кабан 228...</div>
								<div className={styles.user__info_time}>4 мин назад</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
