import { toggleViewForm } from '@/entities/Forms'
import { selectData } from '@/entities/Forms/FormsData'
import { toggleModal } from '@/entities/Modal'
import { useLoginMutation } from '@/features/Auth/api'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Forgot } from '@/widgets/ForgotPassword'
import { Login } from '@/widgets/Login'
import { Register } from '@/widgets/Register'
import { useEffect } from 'react'
import { LiaKeySolid } from 'react-icons/lia'
import { LuUser2 } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'
type TypeForms = 'login' | 'register' | 'forgot'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const useReturnsElements = (styles: CSSModuleClasses) => {
	const [login, { isSuccess, isError, isLoading }] = useLoginMutation()

	const dispatch = useAppDispatch()
	const loginData = useAppSelector(selectData).login
	const handleLogin = () => {
		login(loginData)
	}

	useEffect(() => {}, [isSuccess, isError, isLoading])

	const returnTop = (typeForm: TypeForms) => {
		switch (typeForm) {
			case 'login':
				return (
					<div className={styles.top}>
						<button
							type='button'
							onClick={() => dispatch(toggleModal())}
							className={styles.close}
						>
							<RxCross2 />
						</button>

						<div className={styles.icon}>
							<LuUser2 />
						</div>
						<span className={styles.hello}>Вход в аккаунт</span>
						<span className={styles.about}>
							Пожалуйста, введите данные для входа <br /> в аккаунт{' '}
						</span>
					</div>
				)
			case 'register':
				return (
					<div className={styles.top}>
						<button
							type='button'
							onClick={() => dispatch(toggleModal())}
							className={styles.close}
						>
							<RxCross2 />
						</button>

						<div className={styles.icon}>
							<LuUser2 />
						</div>
						<span className={styles.hello}>Регистрация</span>
						<span className={styles.about}>
							Пожалуйста, введите данные для <br />
							регистрации аккаунта
						</span>
					</div>
				)
			case 'forgot':
				return (
					<div className={styles.top}>
						<button
							type='button'
							onClick={() => dispatch(toggleModal())}
							className={styles.close}
						>
							<RxCross2 />
						</button>

						<div className={styles.icon}>
							<LiaKeySolid />
						</div>
						<span className={styles.hello}>Восстановление доступа</span>
						<span className={styles.about}>
							Пожалуйста, введите данные для <br /> восстановление доступа к аккаунту
						</span>
					</div>
				)
		}
	}

	const returnForm = (typeForm: TypeForms) => {
		switch (typeForm) {
			case 'login':
				return <Login />
			case 'register':
				return <Register />
			case 'forgot':
				return <Forgot />
		}
	}

	const returnLinkForm = (typeForm: TypeForms) => {
		switch (typeForm) {
			case 'login':
				return (
					<>
						<button
							className={styles.link}
							type='button'
							onClick={() => dispatch(toggleViewForm('forgot'))}
						>
							Забыл пароль
						</button>
						<button
							type='button'
							className={styles.link}
							onClick={() => dispatch(toggleViewForm('register'))}
						>
							Нет аккаунта/ <br />
							Зарегистрироваться
						</button>
					</>
				)
			case 'register':
				return (
					<button
						type='button'
						className={styles.link}
						onClick={() => dispatch(toggleViewForm('login'))}
					>
						Есть аккаунт/ <br />
						Вход в аккаунт
					</button>
				)
			case 'forgot':
				return (
					<button
						type='button'
						className={styles.link}
						onClick={() => dispatch(toggleViewForm('login'))}
					>
						Войти
					</button>
				)
		}
	}

	const returnButtonForm = (typeForm: TypeForms) => {
		switch (typeForm) {
			case 'login':
				return (
					<button
						type='button'
						className={styles.login}
						onClick={handleLogin}
					>
						Войти
					</button>
				)
			case 'register':
				return (
					<button
						type='button'
						className={styles.login}
					>
						Зарегистрироваться
					</button>
				)
			case 'forgot':
				return (
					<button
						type='button'
						className={styles.login}
					>
						Отправить
					</button>
				)
		}
	}
	return { returnForm, returnLinkForm, returnButtonForm, returnTop }
}
