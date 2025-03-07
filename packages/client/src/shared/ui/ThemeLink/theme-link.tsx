import { generateThemeUrl, replaceMessage, timeSincePublication, trimmingText } from '@/shared/lib'
import { IThemePageRes } from '@/shared/types'
import { RenderLatestMessage } from '@/shared/ui'
import { RenderAvatar } from '@/shared/ui/RenderAvatar'
import classNames from 'classnames'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './theme-link.module.sass'

export function ThemeLink(props: IThemePageRes) {
	const { themeTitle, views, countThemeMessages, latestThemeMessage, createdAt, user } = props

	return (
		<Link
			to={generateThemeUrl({ isChapter: false, props })}
			className={classNames(styles.chapter, styles.theme)}
		>
			<RenderAvatar user={user} />
			<div className={styles.wrapper}>
				<div className={styles.chapter__left}>
					<div className={styles.chapter__left_title}>{trimmingText(themeTitle, 25)}</div>
					<div className={styles.chapter__left_theme_info}>
						<span className={styles.chapter__left_theme_info_item}>{user.userLogin}</span>
						<span className={styles.chapter__left_theme_info_dot} />
						<span className={styles.chapter__left_theme_info_item}>{timeSincePublication(createdAt)}</span>
					</div>
				</div>
				<div className={styles.chapter__right}>
					<div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit />
							Просмотры
							<span className={styles.chapter__info_count}>{views ?? 0}</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.chapter__info_item}>
							<PiWechatLogoBold />
							Сообщения
							<span className={styles.chapter__info_count}>{replaceMessage(countThemeMessages)}</span>
						</span>
					</div>
					<RenderLatestMessage latest={latestThemeMessage} />
				</div>
			</div>
		</Link>
	)
}
