import { type RefObject, useEffect } from 'react'

export function useOutsideClick<T extends HTMLElement | null>(ref: RefObject<T>, onClose: () => void): void {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node

			const autocompletePopper = document.querySelector('.MuiAutocomplete-popper')
			if (autocompletePopper?.contains(target)) {
				return
			}

			if (ref.current && !ref.current.contains(target)) {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, onClose])
}
