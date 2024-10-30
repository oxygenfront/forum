import { Container } from '@/shared/ui'
import classNames from 'classnames'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './footer.module.sass'
export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Container className={styles.wrapper}>
				<div className={styles.left}>
					<ul className={styles.links}>
						<li className={styles.links__item}>
							<Link to='/'>Главная</Link>
						</li>
						<li className={styles.links__item}>
							<Link to='/forum'>Форум</Link>
						</li>
						<li className={styles.links__item}>
							<Link to=''>Новости</Link>
						</li>
						<li className={classNames(styles.links__item, styles.vip)}>
							<Link to=''>VIP</Link>
						</li>
						<li className={styles.links__item}>
							<Link to=''>Обратная связь</Link>
						</li>
						<li className={styles.links__item}>
							<Link to='/warrantor'>Гарант</Link>
						</li>
						<li className={styles.links__item}>
							<Link to=''>Условия и правила</Link>
						</li>
					</ul>
					<p>2024 Все права защищены.</p>
				</div>
				<div className={styles.right}>
					<div className={styles.logo}>Лого</div>
					<span>Название сайте</span>
				</div>
			</Container>
		</footer>
	)
}
