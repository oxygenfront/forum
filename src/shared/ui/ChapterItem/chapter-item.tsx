import { timeSincePublication } from '@/shared/lib/helpers'
import type { IChapter } from '@/shared/model'
import type { FC } from 'react'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-item.module.sass'

export const ChapterItem: FC<IChapter> = (props) => {
	const { id, count_themes, last_message, count_messages, user, title_chapter } = props

	function replaceMessage(count_messages: number) {
		if (count_messages > 1000) {
			return String(Math.floor(count_messages / 1000)).concat('к')
		}
		return count_messages
	}

	return (
		<Link
			to={`chapter/${id}`}
			className={styles.chapter}
		>
			<BsChatText />
			<div className={styles.wrapper}>
				<div className={styles.chapter__left}>{title_chapter}</div>
				<div className={styles.chapter__right}>
					<div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit />
							Темы<span className={styles.chapter__info_count}>{count_themes}</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.chapter__info_item}>
							<PiWechatLogoBold />
							Сообщения<span className={styles.chapter__info_count}>{replaceMessage(count_messages)}</span>
						</span>
					</div>
					<div className={styles.user}>
						<img
							src={user.avatar}
							alt='Аватар пользователя'
							className={styles.user_avatar}
						/>
						<div className={styles.user__wrapper}>
							<p className={styles.user_message}>{last_message.latest_question}</p>
							<div className={styles.user__info}>
								<div className={styles.user__info_name}>{user.nickname}</div>
								<div className={styles.user__info_time}>{timeSincePublication(last_message.created_at)}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
