import { ChapterItem, Title } from '@/shared/ui'
import { useGetChaptersQuery } from '@/widgets/ChaptersBlock'
import type { FC } from 'react'
import styles from './chapters-block.module.sass'
export const ChaptersBlock: FC = () => {
	const { data, isLoading } = useGetChaptersQuery('users,last_messages')

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
						<ChapterItem
							key={el.id}
							{...el}
						/>
					))}
				</div>
			</div>
		</>
	)
}
