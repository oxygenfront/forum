import { selectUserData } from '@/features/Auth'
import { useGetUserChatsQuery } from '@/pages/AllChats/api'
import { useAppSelector } from '@/shared/lib/hooks'
import { BlockContainer, Loader } from '@/shared/ui'
import { ChatLink } from '@/widgets/ChatLink'
import { type FC, Fragment } from 'react'
import styles from './chats.module.sass'
export const AllChatsPages: FC = () => {
	const { id } = useAppSelector(selectUserData)
	const { data, isLoading } = useGetUserChatsQuery(id, { skip: !id })

	if (isLoading) {
		return <Loader />
	}
	return (
		<>
			{data?.length ? (
				<BlockContainer title='Мои чаты'>
					{data.map((el, i) => (
						<Fragment key={el.id}>
							<ChatLink {...el} />
							{i !== data.length - 1 && <hr className={styles.hr} />}
						</Fragment>
					))}
				</BlockContainer>
			) : (
				'У вас нет активных чатов, желаете создать ?'
			)}
		</>
	)
}
