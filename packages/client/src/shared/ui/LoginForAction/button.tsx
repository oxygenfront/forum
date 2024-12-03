import { toggleAuthModal } from '@/entities/Modal'
import { useAppDispatch } from '@/shared/lib/hooks'
import type { FC } from 'react'
import styles from './button.module.sass'
export const LoginForAction: FC = () => {
	const dispatch = useAppDispatch()
	function handleClick() {
		dispatch(toggleAuthModal())
	}
	return (
		<button
			type='button'
			onClick={handleClick}
			className={styles.button}
		>
			Войдите чтобы комментировать
		</button>
	)
}
