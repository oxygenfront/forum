import classNames from 'classnames'
import React, { type FC, useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './modal.module.sass'

export const ModalSort: FC<{ arrayTitles: string[] }> = ({ arrayTitles }) => {
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
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className={classNames(styles.button__open, { [styles.active]: isOpen })}
			>
				<BsThreeDotsVertical />
			</button>
			{isOpen && arrayTitles.length > 0 && (
				<div className={styles.modal}>
					{arrayTitles.map((el, index) => (
						<React.Fragment key={`${el}_${index + 1}`}>
							<div className={styles.modal__item}>{el}</div>
						</React.Fragment>
					))}
				</div>
			)}
		</div>
	)
}
