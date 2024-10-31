import { type TypeForms, clearData, selectForms, setTypeForm } from '@/entities/Forms'
import { toggleAuthModal } from '@/entities/Modal'

import { setIsLogin, setUserData, useLoginMutation, useRegisterMutation } from '@/features/Auth'

import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { ROLES } from '@/shared/model'

import { setHint } from '@/shared/ui/InputsForm'
import { Forgot } from '@/widgets/ForgotPassword'
import { Login } from '@/widgets/Login'
import { Register } from '@/widgets/Register'
import { useEffect } from 'react'
import { LiaKeySolid } from 'react-icons/lia'
import { LuUser2 } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const useReturnsElements = (styles: CSSModuleClasses) => {
	const [login, { isLoading: isLoadingLogin, isSuccess: isSuccessLogin, data: fetchLoginData, isError: isErrorLogin }] =
		useLoginMutation()
	const [register, { isLoading: isLoadingRegister, isSuccess: isSuccessRegister, isError: isErrorRegister }] =
		useRegisterMutation()
	const dispatch = useAppDispatch()
	const { login: storeLoginData, register: storeRegisterData } = useAppSelector(selectForms)
	const checkIsEmptyObject = (obj: object) => Object.entries(obj).some(([_, val]) => val === '')

	const handleLogin = () => {
		if (checkIsEmptyObject(storeLoginData)) {
			if (storeLoginData.userLogin === '') {
				dispatch(setHint({ type: 'login', key: 'userLogin', status: true, hintKey: 'isEmptyLogin' }))
			}

			if (storeLoginData.userPassword === '') {
				dispatch(setHint({ type: 'login', key: 'userPassword', status: true, hintKey: 'isEmptyPassword' }))
			}
		} else {
			login({ email: storeLoginData.userLogin, password: storeLoginData.userPassword })
			dispatch(clearData())
		}
	}

	const handleRegister = () => {
		if (checkIsEmptyObject(storeRegisterData)) {
			if (storeRegisterData.userLogin === '') {
				dispatch(setHint({ type: 'register', key: 'userLogin', status: true, hintKey: 'isEmptyLogin' }))
			} else {
				dispatch(setHint({ type: 'register', key: 'userLogin', status: false, hintKey: null }))
			}

			if (storeRegisterData.userEmail === '') {
				dispatch(setHint({ type: 'register', key: 'userEmail', status: true, hintKey: 'isEmptyEmail' }))
			} else {
				dispatch(setHint({ type: 'register', key: 'userEmail', status: false, hintKey: null }))
			}

			if (storeRegisterData.userPassword === '') {
				dispatch(setHint({ type: 'register', key: 'userPassword', status: true, hintKey: 'isEmptyPassword' }))
			} else {
				dispatch(setHint({ type: 'register', key: 'userPassword', status: false, hintKey: null }))
			}

			if (storeRegisterData.userConfirmPassword === '') {
				dispatch(
					setHint({ type: 'register', key: 'userConfirmPassword', status: true, hintKey: 'isEmptyConfirmPassword' }),
				)
			} else {
				dispatch(setHint({ type: 'register', key: 'userConfirmPassword', status: false, hintKey: null }))
			}
		} else {
			register({
				email: storeRegisterData.userEmail,
				userLogin: storeRegisterData.userLogin,
				password: storeRegisterData.userPassword,
				role: ROLES.USER,
			})
		}
	}

	useEffect(() => {
		if (isSuccessRegister) {
			dispatch(setTypeForm('login'))
		}
	}, [isSuccessRegister])

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
				return <Login isErrorLogin={isErrorLogin} />
			case 'register':
				return <Register isErrorRegister={isErrorRegister} />
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
