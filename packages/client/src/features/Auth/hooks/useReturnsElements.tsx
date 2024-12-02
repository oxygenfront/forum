import { type TypeForms, clearData, selectForms, setTypeForm } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'

import { setIsLogin, setUserData, useLoginMutation, useRegisterMutation } from '@/features/Auth'

import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IRegisterRes } from '@/shared/types/auth.types'
import { Forgot } from '@/widgets/ForgotPassword'
import { Login } from '@/widgets/Login'
import { setRememberMe } from '@/widgets/Login'
import { Register } from '@/widgets/Register'

import { useEffect } from 'react'
import { LiaKeySolid } from 'react-icons/lia'
import { LuUser2 } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const useReturnsElements = (styles: CSSModuleClasses) => {
	const [login, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin, data: fetchLoginData, error: errorLogin }] =
		useLoginMutation()
	const [
		register,
		{ isLoading: isLoadingRegister, isSuccess: isSuccessRegister, data: fetchRegisterData, error: errorRegister },
	] = useRegisterMutation()
	const dispatch = useAppDispatch()

	const { login: storeLoginData, register: storeRegisterData } = useAppSelector(selectForms)

	const handleLogin = () => {
		login({ userEmail: storeLoginData.userEmail, userPassword: storeLoginData.userPassword })
	}

	const handleRegister = () => {
		register({
			userEmail: storeRegisterData.userEmail,
			userLogin: storeRegisterData.userLogin,
			userPassword: storeRegisterData.userPassword,
			role: storeRegisterData.role,
		})
	}

	useEffect(() => {
		const handleAuthSuccess = (fetchData: IRegisterRes) => {
			dispatch(setUserData(fetchData))
		}

		if (isSuccessLogin) {
			handleAuthSuccess(fetchLoginData)
			dispatch(clearData())
			dispatch(toggleAuthModal())
			dispatch(setIsLogin(true))
		} else if (errorLogin) {
			//TODO написать логику для обработки хинтов и ошибок для логина
		}
		if (isSuccessRegister) {
			handleAuthSuccess(fetchRegisterData)
			dispatch(clearData())
			dispatch(setRememberMe(true))
			dispatch(toggleAuthModal())
			dispatch(setIsLogin(true))
		} else if (errorRegister) {
			//TODO написать логику для обработки хинтов и ошибок для регистра
		}
	}, [isSuccessLogin, isLoadingLogin, isLoadingRegister, isSuccessRegister])

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
							Пожалуйста, введите данные для входа <br /> в аккаунт
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
							onClick={() => dispatch(setTypeForm('forgot'))}
						>
							Забыл пароль
						</button>
						<button
							type='button'
							className={styles.link}
							onClick={() => dispatch(setTypeForm('register'))}
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
						onClick={() => dispatch(setTypeForm('login'))}
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
						onClick={() => dispatch(setTypeForm('login'))}
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
						disabled={isLoadingLogin}
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
						disabled={isLoadingRegister}
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
