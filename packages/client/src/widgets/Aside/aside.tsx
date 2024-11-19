import { PurchasedBlock } from '@/widgets/PurchasedBlock'
import { StatsBlock } from '@/widgets/StatsBlock'
import type { FC } from 'react'
import styles from './aside.module.sass'
export const Aside: FC = () => {
	return (
		<div className={styles.aside}>
			<StatsBlock />
			<PurchasedBlock />
		</div>
	)
}
