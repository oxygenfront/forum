import type { FC, ReactNode } from 'react'
import styles from './title.module.sass'
interface TitleProps {
	children: ReactNode
}
export const Title: FC<TitleProps> = ({ children }) => {
	return <div className={styles.title}>{children}</div>
}
