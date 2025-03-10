import classNames from 'classnames'
import React, { type FC, ReactNode, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './modal.module.sass'

export const ModalOptions: FC<{ arrayActions: ReactNode[] }> = ({ arrayActions }) => {
	const [isOpen, setIsOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement | null>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	const handleClickKeyboard = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleClickKeyboard)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleClickKeyboard)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleClickKeyboard)
		}
	}, [isOpen])

	return (
		<div
			className={styles.wrapper}
			ref={modalRef}
		>
			<div className={styles.wrapper__absolute}>
				<button
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					className={classNames(styles.button__open, { [styles.active]: isOpen })}
				>
					<BsThreeDotsVertical />
				</button>
				{isOpen && arrayActions.length && (
					<div className={styles.modal}>
						{arrayActions.map((el, i) => (
							<React.Fragment key={(el as React.ReactElement).key || undefined}>
								{el} {i !== arrayActions.length - 1 && <hr className={styles.hr} />}
							</React.Fragment>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
