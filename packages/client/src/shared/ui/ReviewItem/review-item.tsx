import { createSlug, timeSincePublication } from '@/shared/lib/helpers'
import type { IResponsePurchased } from '@/widgets/PurchasedBlock'
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
				<img
					className={styles.review_avatar}
					src={user.userImage || ''}
					alt='Аватар пользователя'
				/>
				<div className={styles.review_main}>
					<div className={styles.review_text}>{content}</div>
					<div className={styles.review_info}>
						Последнее: {user.userLogin} <GoDotFill />
						<span>{timeSincePublication(createdAt)}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
