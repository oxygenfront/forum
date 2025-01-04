import { selectIsLogin, useGetAuthQuery } from '@/features/Auth'
import { PATH } from '@/shared/constants'
import { useAppSelector } from '@/shared/lib/hooks.ts'
import { Container } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import { type FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './layout.module.sass'

export const Layout: FC = () => {
	const { pathname } = useLocation()
	const isLogin = useAppSelector(selectIsLogin)
	useGetAuthQuery(undefined, { skip: isLogin })
	const isLoggedUser = isLogin || localStorage.getItem('token') || sessionStorage.getItem('token')
	return (
		<>
			<Container>
				<Header />
				{pathname !== PATH.PROFILE && !isLoggedUser && <HelloBlock />}
				<main className={styles.main}>
					<Main />
					{pathname !== PATH.ALL_CHATS && <Aside />}
				</main>
			</Container>
			<Footer />
		</>
	)
}
