import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import styles from './container.module.sass'
interface ContainerProps {
	children: ReactNode
	className?: string
}
export const Container: FC<ContainerProps> = ({ children, className }) => {
	return <div className={classNames(styles.container, className)}>{children}</div>
}
