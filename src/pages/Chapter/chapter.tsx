import { BlockThemeContainer } from '@/shared/ui'
import type { FC } from 'react'
import { useParams } from 'react-router-dom'
import styles from './chapter.module.sass'
export const ChapterPage: FC = () => {
	const { slug } = useParams()
	return (
		<>
			<BlockThemeContainer title='Популярное' />
			<div className={styles.wrapper}>
				<div className={styles.titles}>
					<p className={styles.title}>Заголовок</p>
					<div className={styles.titles_right}>
						<div className={styles.title}>Просмотры/Ответы</div>
						<div className={styles.title}>Последние сообщения</div>
					</div>
				</div>
			</div>
		</>
	)
}
