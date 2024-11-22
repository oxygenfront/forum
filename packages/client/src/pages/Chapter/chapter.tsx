import { UI_COMPONENT } from '@/shared/model'
import { BlockThemeContainer, ChapterLink } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { useGetChapterPageQuery } from 'pages/Chapter/api/getChapters.ts'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import styles from './chapter.module.sass'

export const ChapterPage: FC = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetChapterPageQuery(id)

	const conditionalForShow = isLoading || !data
	return (
		<>
			{conditionalForShow ? null : <BlockThemeContainer title={data.chapterTitle} />}
			<div className={styles.wrapper}>
				<div className={styles.titles}>
					<p className={styles.title}>Заголовок</p>
					<div className={styles.titles_right}>
						<div className={styles.title}>Просмотры/Ответы</div>
						<div className={styles.title}>Последние сообщения</div>
					</div>
				</div>

				{conditionalForShow ? (
					<Loader loading={conditionalForShow} />
				) : (
					data.chapterThemes.map((el) => {
						return (
							<ChapterLink
								{...el}
								key={el.id}
								ui={UI_COMPONENT.THEME_LINK}
							/>
						)
					})
				)}
			</div>
		</>
	)
}
