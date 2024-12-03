import { createSlug, timeSincePublication, trimmingText } from '@/shared/lib/helpers'
import type { IResponsePurchased } from '@/shared/types'
import classNames from 'classnames'
import type { FC } from 'react'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'
import styles from './review-item.module.sass'

export const ReviewItem: FC<IResponsePurchased> = ({
	content,
	themeId,
	user,
	createdAt,
	chapterId,
	titleTheme,
	titleChapter,
}) => {
	return (
		<Link
			to={`chapter/${createSlug(titleChapter)}/${chapterId}/theme/${createSlug(titleTheme)}/${themeId}`}
			className={styles.wrapper}
		>
			<div className={styles.review}>
				{user.userImage ? (
					<img
						src={user.userImage}
						alt='Аватар'
						className={styles.review_avatar}
					/>
				) : (
					<div
						style={{ backgroundColor: user.avatarColor }}
						className={classNames(styles.review_avatar, styles.noImg)}
					>
						{user.userLogin[0]}
					</div>
				)}
				<div className={styles.review_main}>
					<div className={styles.review_text}>{trimmingText(content, 30)}</div>
					<div className={styles.review_info}>
						Последнее: {user.userLogin} <GoDotFill />
						<span>{timeSincePublication(createdAt)}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
