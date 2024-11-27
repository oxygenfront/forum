import { useSearchAllQuery } from '@/features/Search/api/searchApi.ts'
import { ModalResults } from '@/features/Search/ui/Modal'
import { useDebounce } from '@/shared/lib'
import classNames from 'classnames'
import type React from 'react'
import { type FC, useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import styles from './search.module.sass'

//Todo Сделать скрытие поиска не авторизованным пользователям, либо при
// поиске предлагало создать аккаунт

export const Search: FC = () => {
	const [active, setActive] = useState(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [inputValue, setInputValue] = useState<string>('')
	const debouncedValue = useDebounce(inputValue, 500)

	const { data, isLoading } = useSearchAllQuery(debouncedValue, {
		skip: !debouncedValue,
		refetchOnMountOrArgChange: true,
	})

	useEffect(() => {
		if (active && inputRef.current) {
			inputRef.current.focus()
		}
	}, [active])

	const resetInput = () => {
		setActive(false)
		setInputValue('')
		if (inputRef.current) {
			inputRef.current?.blur()
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		switch (event.key) {
			case 'Enter':
				resetInput()
				break
			case 'Escape':
				setActive(false)
				break
		}
	}

	return (
		<div className={styles.relative}>
			<div className={styles.search}>
				<input
					type='text'
					placeholder='Что ищем сегодня ?'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className={classNames(styles.search__input, {
						[styles.isClosed]: !active,
					})}
					onFocus={() => setActive(true)}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
				<button
					type='button'
					className={styles.search__button}
					onClick={active ? resetInput : () => setActive(!active)}
				>
					<CiSearch />
				</button>
			</div>
			{isLoading ? <ModalResults loading /> : data && active && inputValue ? <ModalResults results={data} /> : null}
		</div>
	)
}
