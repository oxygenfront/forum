import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChat } from '@/shared/types'
import { BlockContainer } from '@/shared/ui'
import { ChatLink } from '@/widgets/ChatLink'
import { CreateNewChatModal } from '@/widgets/ModalCreateNewChat'
import { toggleCreateModalOpen } from '@/widgets/ModalCreateNewChat/model'
import { selectNewChat } from '@/widgets/ModalCreateNewChat/model/selector'
import { type FC, Fragment, useEffect, useState } from 'react'
import styles from './chats.module.sass'

export const AllChatsPages: FC = () => {
	const { createModalOpen } = useAppSelector(selectNewChat)
	const dispatch = useAppDispatch()
	const [chats, setChats] = useState<IChat[]>([])
	const { socket } = useSocket()

	useEffect(() => {
		if (!socket) {
			return
		}

		socket.on('updateChat', (updatedChat: IChat[]) => {
			console.log(updatedChat)
			setChats(updatedChat)
		})
	}, [socket])

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

			{createModalOpen && <CreateNewChatModal />}
		</>
	)
}
