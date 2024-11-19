import { RiArrowUpSLine } from 'react-icons/ri'
import styles from './accordion.module.sass'
export const Accordion = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.title}>Внешний вид профиля</div>
				<RiArrowUpSLine className={styles.icon} />
			</div>
		</>
	)
}
