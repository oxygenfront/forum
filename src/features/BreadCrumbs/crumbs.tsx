import { ROUTES } from '@/shared/model'
import classNames from 'classnames'
import type { FC } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { IoTriangle } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import styles from './crumbs.module.sass'

export const BreadCrumbs: FC = () => {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)

	const routes = pathnames.map((path, index) => {
		const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
		return { path: routeTo, name: ROUTES[path] }
	})

	return (
		<div className={styles.crumbs}>
			<span className={styles.route}>
				<IoTriangle className={classNames(styles.route__arrow, styles.main)} />
				<Link
					to='/'
					className={styles.route__text}
				>
					Главная
				</Link>
			</span>
			{routes.map((route) => (
				<span
					key={route.path}
					className={styles.route}
				>
					<IoIosArrowForward className={styles.route__arrow} />
					<Link
						to={route.path}
						className={styles.route__text}
					>
						{route.name}
					</Link>
				</span>
			))}
		</div>
	)
}
