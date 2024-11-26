import { IChapterResult, IThemeResult } from '@/features/Search/model'
import { ResultElement } from '@/features/Search/ui/ResultElement'
import { Loader } from '@/shared/ui/Loader'
import { FC } from 'react'
import styles from './modal-results.module.sass'

// Типизация входных данных
interface IModalResultsProps {
	results?: (({ type: 'theme' } & IThemeResult) | ({ type: 'chapter' } & IChapterResult))[]
	loading?: boolean
}

export const ModalResults: FC<IModalResultsProps> = ({ results, loading }) => {
	return (
		<div className={styles.wrapper}>
			{loading || !results ? (
				<Loader loading={true} />
			) : results.length ? (
				results?.map((result) => {
					return (
						<ResultElement
							key={result.id}
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
