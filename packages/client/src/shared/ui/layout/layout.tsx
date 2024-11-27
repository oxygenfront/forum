import { selectIsLogin, setIsLogin, setUserData, useGetAuthQuery, useLoginMutation } from '@/features/Auth'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import { PATH } from '@/shared/model'
import { Container } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import { type FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './layout.module.sass'

export const Layout: FC = () => {
	const { pathname } = useLocation()
	const [_, { isSuccess: isSuccessLogin }] = useLoginMutation()
	const isLogin = useAppSelector(selectIsLogin)
	const { data, isSuccess } = useGetAuthQuery(undefined, { skip: !!isLogin })
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (isSuccess || data) {
			dispatch(setUserData(data))
			dispatch(setIsLogin(true))
		}
	}, [data, isSuccessLogin])

	return (
		<>
			<Container>
				<Header />
				{pathname !== PATH.PROFILE && !isLogin && <HelloBlock />}
				<main className={styles.main}>
					<Main />
					<Aside />
				</main>
			</Container>
			<Footer />
		</>
	)
}
