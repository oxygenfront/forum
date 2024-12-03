import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { selectCurrentPage, setPagination } from '@/shared/ui/Pagination/model'
import classNames from 'classnames'
import type { FC } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import styles from './pagination.module.sass'
interface IPaginationProps {
	meta: {
		totalPages: number
		currentPage: number
	}
}
export const Pagination: FC<IPaginationProps> = ({ meta }) => {
	const { totalPages, currentPage } = meta

	const dispatch = useAppDispatch()
	const storedCurrentPage = useAppSelector(selectCurrentPage)

	const getPaginationRange = () => {
		const range: (number | string)[] = []

		if (currentPage > 1) {
			range.push(currentPage - 1)
		}

		range.push(currentPage)

		if (currentPage < totalPages) {
			range.push(currentPage + 1)
		}

		if (totalPages - currentPage > 2) {
			range.push('...')
		}

		if (currentPage !== totalPages && !range.includes(totalPages)) {
			range.push(totalPages)
		}

		return range
	}

	const handleIncrementPage = () => {
		dispatch(setPagination(storedCurrentPage + 1))
	}

	const handleDecrementPage = () => {
		dispatch(setPagination(storedCurrentPage - 1))
	}

	const handleCurrentPage = (page: number) => {
		dispatch(setPagination(page))
	}
	return (
		<div className={styles.pagination}>
			{currentPage === 1 ? null : (
				<button
					type='button'
					className={styles.pagination_item}
					onClick={handleDecrementPage}
				>
					<MdKeyboardArrowLeft />
				</button>
			)}
			{getPaginationRange().map((page) => {
				return (
					<button
						type='button'
						key={Math.random()}
						className={classNames(styles.pagination_item, {
							[styles.current]: Number(currentPage) === page,
						})}
						disabled={typeof page === 'string'}
						onClick={() => handleCurrentPage(page as number)}
					>
						{page}
					</button>
				)
			})}
			{currentPage === totalPages ? null : (
				<button
					type='button'
					className={styles.pagination_item}
					onClick={handleIncrementPage}
				>
					<MdKeyboardArrowRight />
				</button>
			)}
		</div>
	)
}
