import { createSlug, replaceMessage, timeSincePublication, trimmingText } from '@/shared/lib/helpers.ts'
import { IChapter, ITheme, UI_COMPONENT } from '@/shared/model'
import classNames from 'classnames'
import { FC } from 'react'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-link.module.sass'

type IChapterLinkProps = (IChapter & { ui: UI_COMPONENT }) | (ITheme & { ui: UI_COMPONENT })

export const ChapterLink: FC<IChapterLinkProps> = (props) => {
	const isChapter = 'chapterTitle' in props

	const themeUrlFromChapters = `chapter/${createSlug((isChapter && props.chapterTitle) as string)}/${isChapter && props.id}/theme/${createSlug((isChapter && props.latestMessage?.theme.titleTheme) as string)}/${isChapter && props.latestMessage?.themeId}`

	const themeUrlFromThemes = `theme/${createSlug((!isChapter && props.titleTheme) as string)}/${!isChapter && props.id}`

	return (
		<Link
			to={`${isChapter ? 'chapter' : 'theme'}/${createSlug(isChapter ? props.chapterTitle : props.titleTheme)}/${props.id}`}
			className={classNames(styles.chapter, { [styles.theme]: !isChapter })}
		>
			{isChapter ? (
				<BsChatText />
			) : (
				<img
					className={classNames(styles.user_avatar, styles.big)}
					src={props.latestThemeMessage?.user.userImage}
					alt='Автар'
				/>
			)}
			<div className={styles.wrapper}>
				<div className={styles.chapter__left}>
					<div className={styles.chapter__left_title}>{isChapter ? props.chapterTitle : props.titleTheme}</div>
					{isChapter ? null : (
						<div className={styles.chapter__left_theme_info}>
							<span className={styles.chapter__left_theme_info_item}>{props.user.userLogin}</span>
							<span className={styles.chapter__left_theme_info_dot} />
							<span className={styles.chapter__left_theme_info_item}>{timeSincePublication(props.createdAt)}</span>
						</div>
					)}
				</div>
				<div className={styles.chapter__right}>
					<div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit />
							{isChapter ? 'Темы' : 'Просмотры'}
							<span className={styles.chapter__info_count}>{isChapter ? props.countThemes : (props.views ?? 0)}</span>
						</span>
						<span className={styles.vertical_line} />
						<span className={styles.chapter__info_item}>
							<PiWechatLogoBold />
							Сообщения
							<span className={styles.chapter__info_count}>
								{replaceMessage(isChapter ? props.countMessages : props.countThemeMessages)}
							</span>
						</span>
					</div>
					<Link
						to={isChapter ? themeUrlFromChapters : themeUrlFromThemes}
						className={styles.user}
					>
						{!(isChapter || props.latestThemeMessage) || (isChapter && !props.latestMessage) ? (
							<span
								style={{
									width: '220px',
									fontSize: '20px',
								}}
							>
								Нет сообщений
							</span>
						) : (
							<>
								<img
									src={isChapter ? props.latestMessage?.user.userImage : props.latestThemeMessage?.user.userImage}
									alt='Аватар пользователя'
									className={styles.user_avatar}
								/>
								<div className={styles.user__wrapper}>
									<p className={styles.user_message}>
										{isChapter
											? trimmingText(props.latestMessage?.content)
											: trimmingText(props.latestThemeMessage?.content)}
									</p>
									<div className={styles.user__info}>
										<div className={styles.user__info_name}>
											{isChapter ? props.latestMessage?.user.userLogin : props.latestThemeMessage?.user.userLogin}
										</div>
										<div className={styles.user__info_time}>
											{isChapter
												? timeSincePublication(props.latestMessage?.createdAt)
												: timeSincePublication(props.latestThemeMessage?.createdAt)}
										</div>
									</div>
								</div>
							</>
						)}
					</Link>
				</div>
			</div>
		</Link>
	)
}
