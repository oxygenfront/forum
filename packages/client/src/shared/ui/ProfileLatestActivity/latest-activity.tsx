import type { FC } from 'react'
import styles from './latest-activity.module.sass'
export const ProfileLatestActivity: FC = () => {
	return (
		<div className={styles.noinfo}>
			<p>
				О пользователе
				<span className={styles.name}>てめ</span>
			</p>
			<p>мы не нашли информацию</p>
		</div>
	)
}
