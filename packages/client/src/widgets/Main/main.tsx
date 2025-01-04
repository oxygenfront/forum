import { selectStatusModal } from '@/entities/Modal'
import { Auth } from '@/features/Auth'
import { PATH } from '@/shared/constants'
import { useAppSelector } from '@/shared/lib/hooks'
import { ButtonLogin } from '@/widgets/ButtonLogin'
import { NavBlock } from '@/widgets/NavBlock'
import type { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './main.module.sass'
export const Main: FC = () => {
	const { pathname } = useLocation()
	const { authModal } = useAppSelector(selectStatusModal)
	return (
		<>
			<div className={styles.main}>
				{pathname !== PATH.PROFILE && !pathname.split('/').includes('chats') && <NavBlock />}
				<Outlet />
				{pathname.split('/')[1] === 'warrantor' ? <ButtonLogin /> : null}
			</div>
			{authModal ? <Auth /> : null}
		</>
	)
}
