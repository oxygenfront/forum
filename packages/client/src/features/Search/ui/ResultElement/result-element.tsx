import { IChapterResult, IThemeResult } from '@/features/Search/model'
import { createSlug, trimmingText } from '@/shared/lib/helpers.ts'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './result-element.module.sass'

interface IResultElement {
	result: ({ type: 'theme' } & IThemeResult) | ({ type: 'chapter' } & IChapterResult)
}
export const ResultElement: FC<IResultElement> = ({ result }) => {
	const themeLink =
		result.type === 'theme'
			? `chapter/${createSlug(result.chapterTitle)}/${result.chapterId}/theme/${createSlug(result.title)}/${result.id}`
			: ''
	const chapterLink = result.type === 'chapter' ? `chapter/${createSlug(result.title)}/${result.id}/` : ''
	return (
		<Link
			to={result.type === 'theme' ? themeLink : chapterLink}
			className={styles.result}
		>
			{result.latestMessage?.user ? (
				<img
					alt='User Avatar'
					className={styles.result_user_image}
					src={result.latestMessage.user.userImage}
				/>
			) : (
				''
			)}
			<div className={styles.result_info}>
				<div className={styles.result_header}>
					<div className={styles.result_title}>{result.title}</div>
					<div className={styles.result_user_login}>{result.latestMessage?.user.userLogin || ''}</div>
				</div>
				<div className={styles.result_subtitle}>
					{result.latestMessage?.content ? trimmingText(result.latestMessage.content, 40) : ''}
				</div>
			</div>
		</Link>
	)
}
