import { createSlug, timeSincePublication } from '@/shared/lib/helpers.ts'
import { IChapter, ITheme, UI_COMPONENT } from '@/shared/model'
import { FC } from 'react'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-link.module.sass'

type IChapterLinkProps = (IChapter & { ui: UI_COMPONENT }) | (ITheme & { ui: UI_COMPONENT })

export const ChapterLink: FC<IChapterLinkProps> = (props) => {
	function replaceMessage(count_messages: number) {
		if (count_messages > 1000) {
			return String(Math.floor(count_messages / 1000)).concat('к')
		}
		return count_messages
	}

	const isChapter = 'chapterTitle' in props

	return (
		<Link
			to={`${isChapter ? 'chapter' : 'theme'}/${createSlug(isChapter ? props.chapterTitle : props.titleTheme)}/${props.id}`}
			className={styles.chapter}
		>
			<BsChatText />
			<div className={styles.wrapper}>
				<div className={styles.chapter__left}>{isChapter ? props.chapterTitle : props.titleTheme}</div>
				<div className={styles.chapter__right}>
					<div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit />
							{isChapter ? 'Темы' : 'Просмотры'}
							<span className={styles.chapter__info_count}>{isChapter ? props.countThemes : +!!props.views}</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.chapter__info_item}>
							<PiWechatLogoBold />
							Сообщения
							<span className={styles.chapter__info_count}>{replaceMessage(isChapter ? props.countMessages : 0)}</span>
						</span>
					</div>
					<div className={styles.user}>
						<img
							src={isChapter ? props.latestMessage?.user.userImage : ''}
							alt='Аватар пользователя'
							className={styles.user_avatar}
						/>
						<div className={styles.user__wrapper}>
							<p className={styles.user_message}>{isChapter ? props.latestMessage?.content : ''}</p>
							<div className={styles.user__info}>
								<div className={styles.user__info_name}>{isChapter ? props.latestMessage?.user.userLogin : ''}</div>
								<div className={styles.user__info_time}>
									{isChapter ? timeSincePublication(props.latestMessage?.createdAt) : ''}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
