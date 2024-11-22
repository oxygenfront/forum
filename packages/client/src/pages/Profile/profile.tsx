import { Accordeon } from '@/shared/ui/Accordion'
import { Appearance } from '@/shared/ui/Appearance'
import { Confidence } from '@/shared/ui/Confidence'
import { GeneralSettings } from '@/shared/ui/GeneralSettings'
// import styles from "./profile.module.sass"
import { UserBlock } from '@/widgets/UserProfileBlock'
export const Profile = () => {
	return (
		<>
			<UserBlock />
			<Accordeon />
			<Appearance />
			<Confidence />
			<GeneralSettings />
		</>
	)
}
