import type { FC } from 'react'
import styles from './headerAdmin.module.sass'

export const HeaderAdmin: FC = () => {
	return (
		<div className={styles.admin}>
			<div className={styles.admin_wrapper}>
				<ul className={styles.admin_wrapper__ul}>
					<button
						type={'button'}
						className={styles.admin_btn}
					>
						Изменение чаптера
					</button>
					<button
						type={'button'}
						className={styles.admin_btn}
					>
						Изменение темы
					</button>
					<button
						type={'button'}
						className={styles.admin_btn}
					>
						Пароли и почты
					</button>
				</ul>
			</div>
		</div>
	)
}
