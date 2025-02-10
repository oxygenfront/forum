import { ChangingTheme } from '@/shared/ui/ChangingTheme'
import { ChoosingTheme } from '@/shared/ui/ChoosingTheme/choosing-theme'
import { HeaderAdmin } from '@/shared/ui/HeaderAdmin/header-admin'
import type { FC } from 'react'
import styles from './admin.module.sass'

export const Admin: FC = () => {
	return (
		<>
			<div className={styles.main}>
				<HeaderAdmin />
				<ChoosingTheme />
				<ChangingTheme />
			</div>
		</>
	)
}
