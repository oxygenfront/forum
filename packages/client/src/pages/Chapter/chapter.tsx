import { useGetChapterPageQuery } from '@/pages/Chapter'
import { BlockThemeContainer } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { ThemeLink } from '@/shared/ui/ThemeLink'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import styles from './chapter.module.sass'

export const ChapterPage: FC = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetChapterPageQuery(id)
	const conditionalForShow = isLoading || !data
	return (
		<>
			{conditionalForShow ? null : <BlockThemeContainer title={data.titleChapter} />}
			<div className={styles.wrapper}>
				<div className={styles.titles}>
					<p className={styles.title}>Заголовок</p>
					<div className={styles.titles_right}>
						<div className={styles.title}>Просмотры/Ответы</div>
						<div className={styles.title}>Последние сообщения</div>
					</div>
				</div>

				{conditionalForShow ? (
					<Loader />
				) : (
					data.chapterThemes.map((el) => {
						return (
							<ThemeLink
								{...el}
								key={el.id}
							/>
						)
					})
				)}
			</div>
		</>
	)
}
