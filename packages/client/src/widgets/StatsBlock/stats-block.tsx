import { BlockContainer } from '@/shared/ui'
import type { FC } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { MdOutlineEdit } from 'react-icons/md'
import { PiWechatLogoBold } from 'react-icons/pi'
import styles from './stats-block.module.sass'
export const StatsBlock: FC = () => {
	return (
		<BlockContainer
			mod='stat'
			modalTitles={['Новости', 'Недельные новости', 'Новости', 'Недельные новости', 'Новости']}
			title='Статистика сайта'
		>
			<div className={styles.block__bottom}>
				<div className={styles.row}>
					<span className={styles.row_title}>
						<MdOutlineEdit />
						Темы:
					</span>
					<span className={styles.row_count}>50к</span>
				</div>
				<hr className={styles.row_hr} />
				<div className={styles.row}>
					<span className={styles.row_title}>
						<PiWechatLogoBold /> Сообщений:
					</span>
					<span className={styles.row_count}>50к</span>
				</div>
				<hr className={styles.row_hr} />
				<div className={styles.row}>
					<span className={styles.row_title}>
						<FaRegUser /> Пользователи:
					</span>
					<span className={styles.row_count}>100</span>
				</div>
			</div>
		</BlockContainer>
	)
}
