import { selectType } from '@/entities/Forms'
import { useReturnsElements } from '@/features/Auth/hooks'
import { useAppSelector } from '@/shared/lib/hooks'
import classNames from 'classnames'
import type { FC } from 'react'
import styles from './form.module.sass'
export const AuthForm: FC = () => {
	const { returnButtonForm, returnForm, returnLinkForm } = useReturnsElements(styles)
	const type = useAppSelector(selectType)

	return (
		<form className={styles.form}>
			{returnForm(type)}
			<div className={classNames(styles.links, { [styles.notLogin]: type !== 'login' })}>{returnLinkForm(type)}</div>
			<hr className={styles.hr} />
			{returnButtonForm(type)}
		</form>
	)
}
