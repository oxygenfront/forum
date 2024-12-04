import { toggleUserModal } from '@/entities/Modal'
import { selectUserData, setIsLogin } from '@/features/Auth'
import { useLogoutMutation } from '@/features/Auth/api'
import { clearUserData } from '@/features/Auth/model'
import { useOutsideClick } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {trimmingText} from '@/shared/lib/'
import { type FC, useEffect, useRef } from 'react'
import { PiWechatLogoBold } from 'react-icons/pi'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { VscAccount } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import styles from './modal.module.sass'

export const UserModal: FC = () => {
	const { userImage, userLogin } = useAppSelector(selectUserData)
	const [logout, { isSuccess, isLoading }] = useLogoutMutation()
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLDivElement>(null)

	function handleClose() {
		dispatch(toggleUserModal())
	}

	function handleLogout() {
		logout()
	}

	useEffect(() => {
		if (isSuccess && !isLoading) {
			dispatch(setIsLogin(false))
			dispatch(clearUserData())
			dispatch(toggleUserModal())
		}
	}, [isSuccess, isLoading])

	useOutsideClick(ref, handleClose)
	return (
		<div
			className={styles.modal}
			ref={ref}
		>
			<div className={styles.user}>
				<div className={styles.user_login}>{trimmingText(userLogin, 10)}</div>
				{userImage ? (
					<img
						src={userImage}
						alt=''
						className={styles.user_image}
					/>
				) : (
					<div className={styles.user_ico}>{<VscAccount />}</div>
				)}
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
