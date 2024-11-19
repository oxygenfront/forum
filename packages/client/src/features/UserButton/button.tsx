import { selectStatusModal, toggleUserModal } from '@/entities/Modal'
import { selectUserData } from '@/features/Auth'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { FC } from 'react'
import { VscAccount } from 'react-icons/vsc'
import styles from './button.module.sass'

export const UserButton: FC = () => {
	const dispatch = useAppDispatch()
	const { userModal } = useAppSelector(selectStatusModal)
	const { userImage } = useAppSelector(selectUserData)
	function handleOpen() {
		dispatch(toggleUserModal())
	}
	return (
		<button
			className={styles.button_modal}
			type='button'
			disabled={userModal}
			onClick={handleOpen}
		>
			{userImage || <VscAccount />}
		</button>
	)
}
