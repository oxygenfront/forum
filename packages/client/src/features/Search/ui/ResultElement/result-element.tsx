import type { ISearchRes } from '@/features/Search'
import { createSlug, trimmingText } from '@/shared/lib/helpers.ts'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './result-element.module.sass'

interface IResultElement {
	result: ISearchRes
}
export const ResultElement: FC<IResultElement> = ({ result }) => {
	const link =
		result.type === 'theme'
			? `chapter/${createSlug(result.titleChapter)}/${result.chapterId}/theme/${createSlug(result.titleTheme)}/${result.themeId}`
			: `chapter/${createSlug(result.titleChapter)}/${result.chapterId}/`

	return (
		<Link
			to={link}
			className={styles.result}
		>
			{result.latestMessage?.user ? (
				<img
					alt='User Avatar'
					className={styles.result_user_image}
					src={result.latestMessage.user.userImage || ''}
				/>
			) : (
				''
			)}
			<div className={styles.result_info}>
				<div className={styles.result_header}>
					<div className={styles.result_title}>{result.type === 'theme' ? result.titleTheme : result.titleChapter}</div>
					<div className={styles.result_user_login}>{result.latestMessage?.user.userLogin || ''}</div>
				</div>
				<div className={styles.result_subtitle}>
					{result.latestMessage?.content ? trimmingText(result.latestMessage.content, 40) : ''}
				</div>
			</div>
		</Link>
	)
}
