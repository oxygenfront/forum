import { selectUserData } from '@/features/Auth'
import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChat } from '@/shared/types'
import { BlockContainer, Loader } from '@/shared/ui'
import { ChatLink } from '@/widgets/ChatLink'
import {
	ModalCreateOrModalSearch,
	selectModalNewChatOrSearchUsersSlice,
	toggleCreateModalOpen,
} from '@/widgets/ModalCreateOrModalSearch'
import { type FC, Fragment, useEffect, useState } from 'react'
import styles from './chats.module.sass'

export const AllChatsPages: FC = () => {
	const { createModalOpen } = useAppSelector(selectModalNewChatOrSearchUsersSlice)
	const { id: userId } = useAppSelector(selectUserData)
	const dispatch = useAppDispatch()
	const [chats, setChats] = useState<IChat[]>([])
	const { socket, connected } = useSocket()

	useEffect(() => {
		if (!(socket && connected)) {
			return
		}

		if (!chats.length) {
			socket.emit('updateChat', { userId })
		}

		socket.on('updateChat', (updatedChat: IChat[]) => {
			setChats(updatedChat)
		})

		return () => {
			socket.off('updateChat')
		}
	}, [socket, connected])

	if (!(connected && socket)) {
		return <Loader />
	}

	return (
		<>
			{chats?.length ? (
				<BlockContainer title='Мои чаты'>
					{chats.map((el, i) => (
						<Fragment key={el.id}>
							<ChatLink
								id={el.id}
								usersCount={el.usersCount}
								title={el.title}
								messagesCount={el.messagesCount}
							/>
							{i !== chats.length - 1 && <hr className={styles.hr} />}
						</Fragment>
					))}
				</BlockContainer>
			) : (
				<p>
					У вас нет активных чатов. <br /> Желаете создать чат ?
				</p>
			)}
			<button
				type='button'
				className={styles.button_create}
				onClick={() => dispatch(toggleCreateModalOpen())}
			>
				Создать чат
			</button>

			{createModalOpen && <ModalCreateOrModalSearch />}
		</>
	)
}
