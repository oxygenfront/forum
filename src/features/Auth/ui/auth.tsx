import { selectType } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'
import { useReturnsElements } from '@/features/Auth/hooks'
import { AuthForm } from '@/features/Auth/ui/AuthForm'
import { useOutsideClick } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { type FC, useRef } from 'react'
import styles from './auth.module.sass'

export const Auth: FC = () => {
	const dispatch = useAppDispatch()
	const { returnTop } = useReturnsElements(styles)

	const type = useAppSelector(selectType)
	const ref = useRef<HTMLDivElement>(null)

	function handleClose() {
		dispatch(toggleAuthModal())
	}
	useOutsideClick(ref, handleClose)

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.content}
				ref={ref}
			>
				{returnTop(type)}
				<AuthForm />
			</div>
		</div>
	)
}
