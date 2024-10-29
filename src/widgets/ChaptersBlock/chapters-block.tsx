import { ChapterItem } from '@/shared/ui/ChapterItem'
import { Title } from '@/shared/ui/TitleBlock'
import type { FC } from 'react'
import styles from './chapters-block.module.sass'
export const ChaptersBlock: FC = () => {
	return (
		<>
			<div className={styles.container}>
				<Title>Форум</Title>
				<hr className={styles.hr} />
				<div className={styles.bottom}>
					<ChapterItem />
					<ChapterItem />
					<ChapterItem />
					<ChapterItem />
					<ChapterItem />
				</div>
			</div>
		</>
	)
}
