import { BlockContainer, ReviewItem } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import type { FC } from 'react'
import { useGetLatestPurchasedQuery } from './api'
export const PurchasedBlock: FC = () => {
	const { data, isLoading } = useGetLatestPurchasedQuery()
	return (
		<BlockContainer title='Последние покупки'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{data?.length
						? data.map((el) => (
								<ReviewItem
									key={el.id}
									{...el}
								/>
							))
						: 'Последних сообщений нет'}
				</>
			)}
		</BlockContainer>
	)
}
