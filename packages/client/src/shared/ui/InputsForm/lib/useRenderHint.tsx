import { Hint } from '@/shared/ui/Hint'
import type { IForgotHint, ILoginHint, IRegisterHint } from '../model/types'

interface UseRenderHintProps {
	hintForType: IRegisterHint | ILoginHint | IForgotHint
	id: string
}

export const useRenderHint = ({ hintForType, id }: UseRenderHintProps) => {
	const isError = Object.entries(hintForType).filter(([key, value]) => key === id && value.status).length

	const renderHint = () => {
		if (isError) {
			const hintsForType = hintForType

			const currentHintEntry = Object.entries(hintsForType).find(([key, value]) => key === id && value.status)

			if (currentHintEntry) {
				const currentHint = currentHintEntry[1]
				return <Hint type={currentHint.hintKey} />
			}
		}
		return null
	}

	return { renderHint, isError }
}
