import { UI_COMPONENT } from '@/shared/model'
import { ChapterLink, Title } from '@/shared/ui'
import { useGetChaptersQuery } from '@/widgets/ChaptersLinks'
import type { FC } from 'react'
import styles from './links-block.module.sass'
export const ChaptersLinksBlock: FC = () => {
	const { data, isLoading } = useGetChaptersQuery()

	if (isLoading || !data) {
		return
	}
	return (
		<>
			<div className={styles.container}>
				<Title>Форум</Title>
				<hr className={styles.hr} />
				<div className={styles.bottom}>
					{data.map((el) => (
						<ChapterLink
							ui={UI_COMPONENT.CHAPTER_LINK}
							key={el.id}
							{...el}
						/>
					))}
				</div>
			</div>
		</>
	)
}
