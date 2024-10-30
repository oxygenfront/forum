import { BlockContainer } from '@/shared/ui'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import banner1 from '/gif/1 banner.gif'
import banner2 from '/gif/2 banner.gif'
import banner3 from '/gif/3 banner.gif'
import banner4 from '/gif/4 banner.gif'
import styles from './nav-block.module.sass'
export const NavBlock: FC = () => {
	return (
		<BlockContainer
			mod='nav'
			title='Навигация'
		>
			<div className={styles.block__bottom}>
				<Link
					to=''
					className={styles.block__bottom_item}
				>
					<img
						src={banner1}
						alt=''
						className={styles.block__bottom_item_img}
					/>
				</Link>
				<Link
					to=''
					className={styles.block__bottom_item}
				>
					<img
						src={banner2}
						alt=''
						className={styles.block__bottom_item_img}
					/>
				</Link>
				<Link
					to=''
					className={styles.block__bottom_item}
				>
					<img
						src={banner3}
						alt=''
						className={styles.block__bottom_item_img}
					/>
				</Link>
				<Link
					to=''
					className={styles.block__bottom_item}
				>
					<img
						src={banner4}
						alt=''
						className={styles.block__bottom_item_img}
					/>
				</Link>
			</div>
		</BlockContainer>
	)
}
