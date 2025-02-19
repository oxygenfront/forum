import { ResultElement } from '@/features/Search'
import type { ISearchRes } from '@/shared/types'
import { Loader } from '@/shared/ui/Loader'
import { FC } from 'react'
import styles from './modal-results.module.sass'

// Типизация входных данных
interface IModalResultsProps {
	results?: ISearchRes[]
	loading?: boolean
}

export const ModalResults: FC<IModalResultsProps> = ({ results, loading }) => {
	return (
		<div className={styles.wrapper}>
			{loading ? (
				<Loader />
			) : results?.length ? (
				results.map((result) => {
					return (
						<ResultElement
							key={result.chapterId}
							result={result}
						/>
					)
				})
			) : (
				<div className={styles.not_found}>К сожалению ничего не найдено</div>
			)}
		</div>
	)
}
