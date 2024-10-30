import { toggleViewForm } from '@/entities/Forms'
import { type TypeForms, selectForms } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'

import { setIsLogin, setUserData, useLoginMutation, useRegisterMutation } from '@/features/Auth'

import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { ROLES } from '@/shared/model'

import { Forgot } from '@/widgets/ForgotPassword'
import { Login } from '@/widgets/Login'
import { Register } from '@/widgets/Register'

import { useEffect } from 'react'
import { LiaKeySolid } from 'react-icons/lia'
import { LuUser2 } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const useReturnsElements = (styles: CSSModuleClasses) => {
	const [login, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin, data: fetchLoginData }] = useLoginMutation()
	const [register] = useRegisterMutation()
	const dispatch = useAppDispatch()
	const { forgot, login: loginData, register: registerData } = useAppSelector(selectForms)

	const handleLogin = () => {
		login({ email: loginData.userLogin, password: loginData.userPassword })
	}

	const handleRegister = () => {
		register({
			email: registerData.userEmail,
			userLogin: registerData.userLogin,
			password: registerData.userPassword,
			role: ROLES.USER,
		})
	}

	useEffect(() => {
		if (!isLoadingLogin && isSuccessLogin) {
			localStorage.setItem('token', fetchLoginData.token)
			dispatch(toggleAuthModal())
			dispatch(setUserData(fetchLoginData.data))
			dispatch(setIsLogin(true))
		}
	}, [isSuccessLogin, isLoadingLogin])

	const returnTop = (typeForm: TypeForms) => {
		switch (typeForm) {
			case 'login':
				return (
					<div className={styles.top}>
						<button
							type='button'
							onClick={() => dispatch(toggleAuthModal())}
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
							onClick={() => dispatch(toggleAuthModal())}
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
							onClick={() => dispatch(toggleAuthModal())}
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
						onClick={handleRegister}
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
