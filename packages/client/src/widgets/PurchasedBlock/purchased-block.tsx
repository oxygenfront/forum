import { BlockContainer, ReviewItem } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import type { FC } from 'react'
import { useGetLatestPurchasedQuery } from './api'
import styles from './purchased-block.module.sass'
export const PurchasedBlock: FC = () => {
	const { data, isLoading } = useGetLatestPurchasedQuery()
	return (
		<BlockContainer
			mod='purchased'
			title='Последние покупки'
			modalTitles={['Новости', 'Недельные новости', 'Новости', 'Недельные новости', 'Новости']}
		>
			{
				<div className={styles.block__bottom}>
					{isLoading ? (
						<Loader loading={isLoading} />
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
				</div>
			}
		</BlockContainer>
	)
}
