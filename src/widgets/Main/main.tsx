import { selectModal } from '@/entities/Modal'
import { Auth } from '@/features/Auth'
import { BreadCrumbs } from '@/features/BreadCrumbs'
import { useAppSelector } from '@/shared/lib/hooks'
import { ButtonLogin } from '@/widgets/ButtonLogin'
import { NavBlock } from '@/widgets/NavBlock'
import type { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './main.module.sass'
export const Main: FC = () => {
	const { pathname } = useLocation()
	const statusModal = useAppSelector(selectModal)
	return (
		<>
			<div className={styles.main}>
				<NavBlock />
				<BreadCrumbs />
				<Outlet />
				{pathname.split('/')[1] === 'warrantor' ? <ButtonLogin /> : null}
			</div>
			{statusModal ? <Auth /> : null}
		</>
	)
}
