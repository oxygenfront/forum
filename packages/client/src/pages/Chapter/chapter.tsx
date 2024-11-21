import { UI_COMPONENT } from '@/shared/model'
import { BlockThemeContainer, ChapterLink } from '@/shared/ui'
import { useLazyGetChapterPageQuery } from 'pages/Chapter/api/getChapters.ts'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './chapter.module.sass'

export const ChapterPage: FC = () => {
	const { id } = useParams()
	const [getChapterPage, { data, isLoading }] = useLazyGetChapterPageQuery()

	useEffect(() => {
		if (id) {
			getChapterPage(id)
		}
	}, [id])

	if (isLoading || !data) {
		return
	}

	const { chapterThemes } = data

	return (
		<>
			<BlockThemeContainer title={data.chapterTitle} />
			<div className={styles.wrapper}>
				<div className={styles.titles}>
					<p className={styles.title}>Заголовок</p>
					<div className={styles.titles_right}>
						<div className={styles.title}>Просмотры/Ответы</div>
						<div className={styles.title}>Последние сообщения</div>
					</div>
				</div>

				{chapterThemes.map((el) => (
					<ChapterLink
						key={el.id}
						ui={UI_COMPONENT.THEME_LINK}
						{...el}
					/>
				))}
			</div>
		</>
	)
}
