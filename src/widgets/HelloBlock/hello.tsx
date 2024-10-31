import { setTypeForm } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'
import { useAppDispatch } from '@/shared/lib/hooks'
import type { FC } from 'react'
import styles from './hello.module.sass'
export const HelloBlock: FC = () => {
	const dispatch = useAppDispatch()
	function handleRegisterButton() {
		dispatch(toggleAuthModal())
		dispatch(setTypeForm('register'))
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper_gradient}>
				<h1 className={styles.title}>Добро пожаловать</h1>
				<p className={styles.text}>
					Каждый из нас понимает очевидную вещь: социально-экономическое развитие создаёт необходимость включения в
					производственный план целого ряда внеочередных мероприятий с учётом комплекса дальнейших направлений развития.
					Сложно сказать, почему реплицированные с зарубежных источников, современные исследования представлены в
					исключительно положительном свете.
				</p>
				<button
					type='button'
					className={styles.register_button}
					onClick={handleRegisterButton}
				>
					Зарегистрироваться
				</button>
			</div>
		</div>
	)
}
