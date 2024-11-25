import { CreateMessage } from '@/features/CreateMessage'
import { BlockThemeContainer } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { Message } from '@/widgets/MessageBlock'
import { useGetThemePageQuery } from 'pages/Theme/api/getThemePage.ts'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ThemePage: FC = () => {
	const { id } = useParams()
	const { data, isLoading } = useGetThemePageQuery(id)
	const [themeId, setThemeId] = useState('')

	const conditionalForShow = isLoading || !data

	useEffect(() => {
		if (data) {
			setThemeId(data.id)
		}
		return () => setThemeId('')
	}, [data])

	if (conditionalForShow) {
		return <Loader loading={isLoading} />
	}

	return (
		<>
			{!data || data.themeMessages.length ? (
				<>
					<BlockThemeContainer
						flag
						title={data.titleTheme}
						createdAt={data.themeMessages[0].createdAt}
						userLogin={data.user.userLogin}
						userImage={data.user.userImage}
						views={data.views ?? 0}
						countThemeMessages={data.countThemeMessages}
					/>
					{data.themeMessages.map((message) => {
						if (themeId === '') {
							setThemeId(message.themeId)
						}
						return (
							<Message
								key={message.id}
								{...message}
							/>
						)
					})}
				</>
			) : (
				'Сообщений по этой теме нет'
			)}
			<CreateMessage themeId={themeId} />
		</>
	)
}
