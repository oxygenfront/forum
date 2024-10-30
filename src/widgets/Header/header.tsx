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
import { Link } from 'react-router-dom'
import styles from './header.module.sass'
export const Header: FC = () => {
	const isLogin = useAppSelector(selectIsLogin)
	const { userModal } = useAppSelector(selectStatusModal)

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
						to={PATH.WARRANTOR}
						className={styles.navbar__button}
					>
						Гарант
					</Link>
				</nav>
			</div>

			<div className={classnames(styles.right_block, { [styles.isLogin]: isLogin })}>
				<Search />
				<span className={styles.vertical_line} />
				{isLogin ? <UserButton /> : <LoginButton />}
				{(userModal || isLogin) && <UserModal />}
			</div>
		</header>
	)
}
