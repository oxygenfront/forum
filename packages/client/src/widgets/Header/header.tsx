import { selectStatusModal } from '@/entities/Modal'
import { selectIsLogin } from '@/features/Auth'
import { LoginButton } from '@/features/LoginButton'
import { Search } from '@/features/Search'
import { UserButton } from '@/features/UserButton'
import { UserModal } from '@/features/UserModal'
import { useAppSelector } from '@/shared/lib/hooks'
import { PATH } from '@/shared/model'
import classnames from 'classnames'
import type { FC } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.sass'

export const Header: FC = () => {
	const isLogin = useAppSelector(selectIsLogin) || !!localStorage.getItem('token')
	const { userModal } = useAppSelector(selectStatusModal)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev)
	}

	return (
		<header className={styles.header}>
			<div className={styles.left_block}>
				<div className={styles.burger}>
					<button
						type='button'
						className={classnames(styles.hamburger, { [styles.hamburger_active]: isMenuOpen })}
						onClick={toggleMenu}
					>
						<tspan />
						<tspan />
						<tspan />
					</button>
					<div className={styles.logo}>Лого</div>
				</div>

				<nav className={classnames(styles.navbar, { [styles.navbar_open]: isMenuOpen })}>
					<Link
						to='/'
						className={styles.navbar__button}
						onClick={() => setIsMenuOpen(false)}
					>
						Форум
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to='#...'
						className={styles.navbar__button}
						onClick={() => setIsMenuOpen(false)}
					>
						Новости
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to='#...'
						className={classnames(styles.navbar__button, styles.vip)}
						onClick={() => setIsMenuOpen(false)}
					>
						VIP
					</Link>
					<span className={styles.vertical_line} />
					<Link
						to={PATH.WARRANTOR}
						className={styles.navbar__button}
						onClick={() => setIsMenuOpen(false)}
					>
						Гарант
					</Link>
				</nav>
			</div>

			<div className={classnames(styles.right_block, { [styles.isLogin]: isLogin })}>
				<Search />
				<span className={styles.vertical_line} />
				{isLogin ? <UserButton /> : <LoginButton />}
				{userModal && isLogin && <UserModal />}
			</div>
		</header>
	)
}
