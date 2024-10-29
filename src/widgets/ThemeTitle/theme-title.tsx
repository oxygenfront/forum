import type { FC, ReactNode } from 'react'
import styles from './theme-title.module.sass'
interface ThemeTitleProps {
	children: ReactNode
}

export const ThemeTitle: FC<ThemeTitleProps> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>
}
