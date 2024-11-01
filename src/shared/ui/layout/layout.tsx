import { selectIsLogin, setIsLogin, setUserData, useGetAuthQuery } from '@/features/Auth'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
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
	const { data, isSuccess } = useGetAuthQuery({})
	const isLogin = useAppSelector(selectIsLogin)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (isSuccess || data) {
			dispatch(setUserData(data))
			dispatch(setIsLogin(true))
		}
	}, [data, isSuccess])
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
