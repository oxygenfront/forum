import {
	generateThemeUrl,
	replaceMessage,
	timeSincePublication,
	trimmingText
} from '@/shared/lib'
import { IChapterPageRes, IThemePageRes } from '@/shared/types'
import classNames from 'classnames'
import { BsChatText } from 'react-icons/bs'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import styles from './chapter-link.module.sass'

type IChapterLinkProps = IChapterPageRes | IThemePageRes

function renderAuthorAvatar( isChapter: boolean, props: IChapterLinkProps ) {
    if ( isChapter ) {
        return <BsChatText/>
    }

    return (
        <>
            {(props as IThemePageRes).user.userImage ? (
                <img
                    src={(props as IThemePageRes).user.userImage}
                    alt=''
                    className={styles.user_avatar}
                />
            ) : (
                <span
                    className={classNames(styles.user_avatar, styles.noImg)}
                    style={{ backgroundColor: (props as IThemePageRes).user.avatarColor }}
                >
					{(props as IThemePageRes).user.userLogin[0].toUpperCase()}
				</span>
            )}
        </>
    )
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function ChapterLink( props: IChapterLinkProps ) {
    const isChapter = 'titleChapter' in props
    const title = isChapter ? props.titleChapter : props.themeTitle
    return (
        <Link
            to={generateThemeUrl({ isChapter, props })}
            className={classNames(styles.chapter, { [styles.theme]: !isChapter })}
        >
            {renderAuthorAvatar(isChapter, props)}
            <div className={styles.wrapper}>
                <div className={styles.chapter__left}>
                    <div
                        className={styles.chapter__left_title}>{trimmingText(title, 12)}</div>
                    {isChapter ? null : (
                        <div className={styles.chapter__left_theme_info}>
                            <span
                                className={styles.chapter__left_theme_info_item}>{props.user.userLogin}</span>
                            <span
                                className={styles.chapter__left_theme_info_dot}/>
                            <span
                                className={styles.chapter__left_theme_info_item}>{timeSincePublication(props.createdAt)}</span>
                        </div>
                    )}
                </div>
                <div className={styles.chapter__right}>
                    <div className={styles.chapter__info}>
						<span className={styles.chapter__info_item}>
							<MdOutlineEdit/>
                            {isChapter ? 'Темы' : 'Просмотры'}
                            <span
                                className={styles.chapter__info_count}>{isChapter ? props.countThemes : (props.views ?? 0)}</span>
						</span>
                        <span className={styles.vertical_line}/>
                        <span className={styles.chapter__info_item}>
							<PiWechatLogoBold/>
							Сообщения
							<span className={styles.chapter__info_count}>
								{replaceMessage(isChapter ? props.countMessages : props.countThemeMessages)}
							</span>
						</span>
                    </div>
                    {!(isChapter || props.latestThemeMessage) || (isChapter && !props.latestMessage) ? (
                        <span
                            style={{
                                width: '220px',
                                fontSize: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
							Нет сообщений
						</span>
                    ) : (
                        <div className={styles.user}>
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
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}