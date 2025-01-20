import { PATH } from '@/shared/constants'
import { ChatInfoAccordion } from '@/widgets/ChatInfoAccordion'
import { ChatMediaAccordion } from '@/widgets/ChatMediaAccordion'
import { PurchasedBlock } from '@/widgets/PurchasedBlock'
import { StatsBlock } from '@/widgets/StatsBlock'
import type { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styles from './aside.module.sass'

export const Aside: FC = () => {
	const { pathname } = useLocation()
	const { id } = useParams()

	const renderBlocks = () => {
		switch (pathname) {
			case `${PATH.ALL_CHATS}/${id}`:
				return (
					<>
						<ChatInfoAccordion />
						<ChatMediaAccordion />
					</>
				)
			case PATH.ALL_CHATS:
				return null
			default:
				return (
					<>
						<StatsBlock />
						<PurchasedBlock />
					</>
				)
		}
	}
	return <div className={styles.aside}>{renderBlocks()}</div>
}
