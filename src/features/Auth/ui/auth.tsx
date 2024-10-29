import { selectType } from '@/entities/Forms'
import { toggleModal } from '@/entities/Modal'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import classNames from 'classnames'
import { type FC, useEffect, useRef } from 'react'
import { useReturnsElements } from '../hooks/hooks'
import styles from './auth.module.sass'

export const Auth: FC = () => {
	const dispatch = useAppDispatch()
	const { returnButtonForm, returnForm, returnLinkForm, returnTop } = useReturnsElements(styles)
	const type = useAppSelector(selectType)
	const ref = useRef<HTMLDivElement>(null)

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dispatch(toggleModal())
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			dispatch(toggleModal())
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

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
