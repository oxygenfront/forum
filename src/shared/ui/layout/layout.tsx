import { Container } from '@/shared/ui/Container'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import type { FC } from 'react'
import styles from './layout.module.sass'

export const Layout: FC = () => {
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
