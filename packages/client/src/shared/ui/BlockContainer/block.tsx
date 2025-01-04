import { ModalOptions } from '@/features/ModalSort'
import { Title } from '@/shared/ui'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import styles from './block.module.sass'

interface IProps {
	children: ReactNode
	mod?: string
	title?: string | ReactNode
	modalTitles?: string[]
}

export const BlockContainer: FC<IProps> = ({ children, mod, title, modalTitles }) => {
	return (
		<div className={classNames(styles.container, mod ? styles[mod] : '')}>
			<div className={styles.top}>
				{title ? <Title>{title}</Title> : null}
				{modalTitles ? <ModalOptions arrayActions={modalTitles} /> : null}
			</div>

			{children ? (
				<>
					<hr className={styles.hr} />
					<div className={styles.bottom}>{children}</div>
				</>
			) : null}
		</div>
	)
}
