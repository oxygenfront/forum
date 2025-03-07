import { ModalOptions } from '@/features/ModalSort'
import styles from './profile-top.module.sass'

export const ProfileTop = () => {
	return (
		<>
			<div className={styles.top}>
				<p className={styles.top_username}>
					Стена пользователя <span className={styles.name}>てめ</span>
				</p>
				<ModalOptions arrayActions={['Редактировать', 'Удалить']} />
			</div>
			<span className={styles.top_line} />
		</>
	)
}
