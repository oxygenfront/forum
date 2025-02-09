import { useGetProfilePageQuery } from '@/pages/Profile/api'
import { Loader } from '@/shared/ui'
import { Accordion } from '@/shared/ui/Accordion'
import { Appearance } from '@/shared/ui/Appearance'
import { Confidence } from '@/shared/ui/Confidence'
import { GeneralSettings } from '@/shared/ui/GeneralSettings'
import { UserBlock } from '@/widgets/UserProfileBlock'
import { useParams } from 'react-router-dom'
export const Profile = () => {
	const { userLogin } = useParams()
	const { data, isLoading } = useGetProfilePageQuery(userLogin as string, { skip: !userLogin })

	if (isLoading) {
		return <Loader />
	}

	if (!data) {
		return 'Профиль не найден'
	}

	return (
		<>
			<UserBlock
				userLogin={data.userLogin}
				userImage={data.userImage}
				role={data.role}
				avatarColor={data.avatarColor}
				createdAt={data.createdAt}
				themeMessagesCount={data.themeMessagesCount}
			/>
			<Accordion />
			<Appearance />
			<Confidence />
			<GeneralSettings />
		</>
	)
}
