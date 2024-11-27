import { BlockContainer } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import type { FC } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import { useGetStatsQuery } from './api'
import styles from './stats-block.module.sass'
export const StatsBlock: FC = () => {
	const { data, isLoading } = useGetStatsQuery()
	return (
		<BlockContainer
			mod='stat'
			modalTitles={['Новости', 'Недельные новости', 'Новости', 'Недельные новости', 'Новости']}
			title='Статистика сайта'
		>
			{data ? (
				<div className={styles.block__bottom}>
					<div className={styles.row}>
						<span className={styles.row_title}>
							<MdOutlineEdit />
							Темы:
						</span>
						<span className={styles.row_count}>{data.countThemes}</span>
					</div>
					<hr className={styles.row_hr} />
					<div className={styles.row}>
						<span className={styles.row_title}>
							<PiWechatLogoBold /> Сообщений:
						</span>
						<span className={styles.row_count}>{data.countMessages}</span>
					</div>
					<hr className={styles.row_hr} />
					<div className={styles.row}>
						<span className={styles.row_title}>
							<FaRegUser /> Пользователи:
						</span>
						<span className={styles.row_count}>{data.countUsers}</span>
					</div>
				</div>
			) : (
				<Loader loading={isLoading} />
			)}
		</BlockContainer>
	)
}
