import type { FC } from 'react'
import styles from './button.module.sass'
export const ButtonLogin: FC = () => {
	return (
		<div className={styles.wrapper}>
			<button type='button'>Войти чтобы разместить</button>
		</div>
	)
}
