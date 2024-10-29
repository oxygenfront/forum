import { LoginButton } from '@/features/LoginButton'
import { Search } from '@/features/Search'
import classnames from 'classnames'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.sass'
export const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.left_block}>
				<div className='logo'>Лого</div>
				<nav className={styles.navbar}>
					<Link
						to='/'
						className={styles.navbar__button}
					>
						Форум
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to='#...'
						className={styles.navbar__button}
					>
						Новости
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to='#...'
						className={classnames(styles.navbar__button, styles.vip)}
					>
						VIP
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to='/warrantor'
						className={styles.navbar__button}
					>
						Гарант
					</Link>
				</nav>
			</div>

			<div className={styles.right_block}>
				<Search />
				<span className={styles.vertical_line} />
				<LoginButton />
			</div>
		</header>
	)
}
