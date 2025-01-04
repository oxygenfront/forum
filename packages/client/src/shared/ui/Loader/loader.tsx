import { FC } from 'react'
import { BounceLoader } from 'react-spinners'
import styles from './loader.module.sass'

export const Loader: FC = () => {
	return (
		<div className={styles.loader}>
			<BounceLoader
				size={100}
				color='#00FFE0'
			/>
		</div>
	)
}
