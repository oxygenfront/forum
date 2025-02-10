import { useChoosingThemeQuery } from '@/shared/ui/ChoosingTheme/api/choosingThemeApi'
import type { FC } from 'react'
import styles from './choosingTheme.module.sass'

export const ChoosingTheme: FC = () => {
	const { data } = useChoosingThemeQuery()
	console.log(data)
	return (
		<div className={styles.choosing}>
			<ul className={styles.choosing_ul}>
				{data !== undefined
					? data.map((el) => (
							<button
								type={'button'}
								key={JSON.stringify(el)}
								className={styles.choosing_btn}
							>
								<li className={styles.choosing_title}>{el.titleChapter}</li>
							</button>
						))
					: ''}
			</ul>
		</div>
	)
}
