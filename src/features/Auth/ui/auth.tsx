import { selectType } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'
import { useReturnsElements } from '@/features/Auth/hooks'
import { useOutsideClick } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import classNames from 'classnames'
import { type FC, useRef } from 'react'
import styles from './auth.module.sass'

export const Auth: FC = () => {
	const dispatch = useAppDispatch()
	const { returnButtonForm, returnForm, returnLinkForm, returnTop } = useReturnsElements(styles)
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
				<form className={styles.form}>
					{returnForm(type)}
					<div className={classNames(styles.links, { [styles.notLogin]: type !== 'login' })}>
						{returnLinkForm(type)}
					</div>
					<hr className={styles.hr} />
					{returnButtonForm(type)}
				</form>
			</div>
		</div>
	)
}
