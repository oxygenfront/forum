import { Accordion } from '@/shared/ui/Accordion'
import { Appearance } from '@/shared/ui/Appearance'
import { Confidence } from '@/shared/ui/Confidence'
import { GeneralSettings } from '@/shared/ui/GeneralSettings'
import { UserBlock } from '@/widgets/UserProfileBlock'
export const Profile = () => {
	return (
		<>
			<UserBlock />
			<Accordion />
			<Appearance />
			<Confidence />
			<GeneralSettings />
		</>
	)
}
