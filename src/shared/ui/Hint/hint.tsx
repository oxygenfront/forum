import { FORM_HINTS_ERRORS } from '@/shared/model/constants'
import type { FC } from 'react'
import styles from './styles.module.sass'

interface IHintProps {
	type: keyof typeof FORM_HINTS_ERRORS
}

export const Hint: FC<IHintProps> = ({ type }) => {
	return <p className={styles.hint}>{FORM_HINTS_ERRORS[type]}</p>
}
