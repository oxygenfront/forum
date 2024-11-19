import { ChapterLink, Title } from '@/shared/ui'
import { useGetChaptersQuery } from '@/widgets/ChaptersLinks'
import type { FC } from 'react'
import styles from './links-block.module.sass'
export const ChaptersLinksBlock: FC = () => {
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
						<ChapterLink
							key={el.id}
							{...el}
						/>
					))}
				</div>
			</div>
		</>
	)
}
