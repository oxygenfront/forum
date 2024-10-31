import { toggleUserModal } from '@/entities/Modal'
import { selectUserData, setIsLogin } from '@/features/Auth'
import { useOutsideClick } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { type FC, useRef } from 'react'
import { PiWechatLogoBold } from 'react-icons/pi'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { VscAccount } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import styles from './modal.module.sass'

export const UserModal: FC = () => {
	const { userImage, userLogin } = useAppSelector(selectUserData)
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLDivElement>(null)

	function handleClose() {
		dispatch(toggleUserModal())
	}

	function handleLogout() {
		localStorage.removeItem('token')
		dispatch(setIsLogin(false))
	}

	useOutsideClick(ref, handleClose)
	return (
		<div
			className={styles.modal}
			ref={ref}
		>
			<div className={styles.user}>
				<div className={styles.user_login}>{userLogin}</div>
				<div className={styles.user_image}>{userImage || <VscAccount />}</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.links}>
				<Link
					to='/profile'
					className={styles.links_item}
				>
					<VscAccount />
					Мой профиль
				</Link>
				<Link
					to='/chat'
					className={styles.links_item}
				>
					<PiWechatLogoBold />
					Мои сообщения
				</Link>
			</div>
			<hr className={styles.hr} />
			<button
				type='button'
				className={styles.logout}
				onClick={handleLogout}
			>
				<RiLogoutCircleRLine />
				Выход
			</button>
		</div>
	)
}
