import { FC } from 'react'
import { BounceLoader } from 'react-spinners'
import styles from './loader.module.sass'
interface ILoaderProps {
	loading: boolean
}
export const Loader: FC<ILoaderProps> = ({ loading }) => {
	return (
		<div className={styles.loader}>
			<BounceLoader
				loading={loading}
				size={100}
				color='#00FFE0'
			/>
		</div>
	)
}
