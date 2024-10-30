import { setIsLogin, setUserData, useGetAuthQuery } from '@/features/Auth'
import { useAppDispatch } from '@/shared/lib/hooks'
import { Container } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import { type FC, useEffect } from 'react'
import styles from './layout.module.sass'

export const Layout: FC = () => {
	const { data, isSuccess } = useGetAuthQuery({})
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (isSuccess) {
			dispatch(setUserData(data))
			dispatch(setIsLogin(true))

		}
	}, [data, dispatch, isSuccess])

	return (
		<>
			<Container>
				<Header />
				<HelloBlock />
				<main className={styles.main}>
					<Main />
					<Aside />
				</main>
			</Container>
			<Footer />
		</>
	)
}
