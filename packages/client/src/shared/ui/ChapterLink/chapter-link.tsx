import { generateThemeUrl, replaceMessage, trimmingText } from '@/shared/lib'
import { IChapterPageRes } from '@/shared/types'
import { RenderLatestMessage } from '@/shared/ui'
import classNames from 'classnames'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-link.module.sass'

export function ChapterLink(props: IChapterPageRes) {
	const { titleChapter, countThemes, countMessages, latestMessage } = props

	return (
		<Link
			to={generateThemeUrl({ isChapter: true, props })}
			className={classNames(styles.chapter, styles.chapter)}
		>
			<BsChatText />
			<div className={styles.wrapper}>
				<div className={styles.chapter__left}>
					<div className={styles.chapter__left_title}>{trimmingText(titleChapter, 25)}</div>
				</div>
				<div className={styles.chapter__right}>
					<div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit />
							Темы
							<span className={styles.chapter__info_count}>{countThemes}</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.chapter__info_item}>
							<PiWechatLogoBold />
							Сообщения
							<span className={styles.chapter__info_count}>{replaceMessage(countMessages)}</span>
						</span>
					</div>
					<RenderLatestMessage latest={latestMessage} />
				</div>
			</div>
		</Link>
	)
}
