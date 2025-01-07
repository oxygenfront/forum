import { FC } from 'react'
import styles from './action.module.sass'

interface IActionProps {
	nameAction: string
	action: (arg?: any) => void
}

export const Action: FC<IActionProps> = ({ nameAction, action }) => {
	return (
		<button
			type='button'
			onClick={action}
			className={styles.action}
		>
			{nameAction}
		</button>
	)
}
