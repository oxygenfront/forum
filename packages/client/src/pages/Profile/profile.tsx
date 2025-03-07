import { selectUserData } from '@/features/Auth'
import { useGetProfilePageQuery } from '@/pages/Profile/api'
import { selectEditProfile } from '@/pages/Profile/model'
import { useAppSelector } from '@/shared/lib/hooks'
import { Loader } from '@/shared/ui'
import { ProfileButtons } from '@/shared/ui/ProfileButtons'
import { ProfileWall } from '@/shared/ui/ProfileWall'
import { Appearance } from '@/widgets/Appearance'
import { Confidence } from '@/widgets/Confidence'
import { UserBlock } from '@/widgets/UserProfileBlock'
import { useParams } from 'react-router-dom'
export const Profile = () => {
	const { userLogin } = useParams()
	const { data, isLoading } = useGetProfilePageQuery(userLogin, { skip: !userLogin })
	const { id } = useAppSelector(selectUserData)
	const { isEditProfile } = useAppSelector(selectEditProfile)
	if (isLoading) {
		return <Loader />
	}

	if (!data) {
		return 'Профиль не найден'
	}
	const myProfile = id === data.id

	return (
		<>
			<UserBlock
				userLogin={data.userLogin}
				userImage={data.userImage}
				role={data.role}
				avatarColor={data.avatarColor}
				createdAt={data.createdAt}
				themeMessagesCount={data.themeMessagesCount}
				isEditProfile={isEditProfile}
				myProfile={myProfile}
			/>
			{myProfile && isEditProfile && (
				<>
					<Appearance
						userLogin={data.userLogin}
						userImage={data.userImage}
						avatarColor={data.avatarColor}
					/>
					<Confidence userEmail={data.userEmail} />
					{/*<GeneralSettings*/}
					{/*	is_show_animated_avatar={data.is_show_animated_avatar}*/}
					{/*	is_close_wall_on_change={data.is_close_wall_on_change}*/}
					{/*	is_show_status_online={data.is_show_status_online}*/}
					{/*	is_private={data.is_private}*/}
					{/*/>*/}
				</>
			)}
			<ProfileButtons />
			<ProfileWall />
		</>
	)
}
