import { Input } from '@/shared/ui/Input'
import type { FC } from 'react'
export const Forgot: FC = () => {
	return (
		<>
			<Input
				label='Электронная почта'
				placeholder='Введите почту'
				id='userEmail'
				type='forgot'
			/>
		</>
	)
}
