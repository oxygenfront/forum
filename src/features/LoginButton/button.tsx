import { setTypeForm } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'
import { useAppDispatch } from '@/shared/lib/hooks'
import type { FC } from 'react'
import { MdLogin } from 'react-icons/md'
import styles from './button.module.sass'

export const LoginButton: FC = () => {
	const dispatch = useAppDispatch()

	function handleButtonClick() {
		dispatch(toggleAuthModal())
		dispatch(setTypeForm('login'))
	}

	return (
		<>
			<button
				type='button'
				className={styles.login__button}
				onClick={handleButtonClick}
			>
				<MdLogin />
				Войти
			</button>
		</>
	)
}
