import { selectUserData } from '@/features/Auth'
import { CreateMessage, clearData, selectMessage } from '@/features/CreateMessage'
import { clearChatData, selectChatData } from '@/pages/Chat/model'
import { initChatData } from '@/shared/constants'
import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChatMessage, IError } from '@/shared/types/chat.types'
import { BlockThemeContainer, Loader } from '@/shared/ui'
import { Action } from '@/shared/ui/Action'
import { clearReplyData, selectReply } from '@/shared/ui/ReplyedMessage'
import { ChatMessage } from '@/widgets/ChatMessageBlock'
import {
	ModalCreateOrModalSearch,
	selectModalNewChatOrSearchUsersSlice,
	toggleSearchUserModalOpen,
} from '@/widgets/ModalCreateOrModalSearch'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Chat = () => {
	const [messages, setMessages] = useState<IChatMessage[]>([])

	const dispatch = useAppDispatch()

	const { chatId } = useParams()
	const navigate = useNavigate()

	const { id: userId } = useAppSelector(selectUserData)
	const selectDataMessage = useAppSelector(selectMessage)
	const { searchUsersModalOpen } = useAppSelector(selectModalNewChatOrSearchUsersSlice)
	const { chatReplyMessages } = useAppSelector(selectReply)
	const chatData = useAppSelector(selectChatData)
	const [error, setError] = useState<IError>()
	const { socket, connected } = useSocket()

	useEffect(() => {
		if (!socket) {
			return
		}

		socket.on('error', (error: IError) => {
			setError(error)
		})

		socket.on('removedFromChat', () => {
			setError({ message: 'Пользователь не имеет доступа к чату', status: 403 })
		})

		socket.on('addedToChat', (data) => {
			setError(undefined)
			socket.emit('updateChat', { userId: data.userId })
			socket.emit('getInfoChat', { userId: data.userId, chatId })
		})

		socket.on('chatMessages', (chatMessages) => {
			setMessages(chatMessages)
		})

		socket.on('messageRemoved', ({ id }) => {
			setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
		})

		socket.on('messageUpdated', (updatedMessage) => {
			setMessages((prevMessages) =>
				prevMessages.map((message) =>
					message.id === updatedMessage.id
						? {
								...message,
								content: updatedMessage.content,
							}
						: message,
				),
			)
		})

		socket.on('newMessage', (message) => {
			setMessages((prevMessages) => [...prevMessages, message])
		})

		return () => {
			socket.off('error')
			socket.off('removedFromChat')
			socket.off('addedToChat')
			socket.off('chatMessages')
			socket.off('messageRemoved')
			socket.off('messageUpdated')
			socket.off('newMessage')
			dispatch(clearChatData())
		}
	}, [chatId, socket, error])

	const handleAddUser = () => {
		dispatch(toggleSearchUserModalOpen())
	}
	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (!socket) {
			return
		}
		if (event.key === 'Enter' && selectDataMessage.content?.trim().length) {
			event.preventDefault()
			const messageData = {
				chatId,
				content: selectDataMessage.content,
				userId,
				parentMessageId: chatReplyMessages.map((message) => message.id),
			}
			if (selectDataMessage.isEdit) {
				socket.emit('updateMessage', {
					chatId,
					messageId: selectDataMessage.messageId,
					content: selectDataMessage.content,
				})
				dispatch(clearData())
				dispatch(clearReplyData())
			} else {
				socket.emit('sendMessage', messageData)
				dispatch(clearData())
				dispatch(clearReplyData())
			}
		}
	}

	const handleLeaveChat = useCallback(() => {
		if (socket) {
			socket.emit('leaveChat', { userId, chatId })
			socket.disconnect()

			navigate(-1)
		}
	}, [chatId, socket, userId, navigate])

	const handleDeleteMessage = (id: string) => {
		if (socket) {
			socket.emit('removeMessage', { id, chatId, userId })

			setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
		}
	}

	if (error && error.status === 403) {
		return 'Чат не найден'
	}
	if (JSON.stringify(chatData) === JSON.stringify(initChatData) || !(socket && connected)) {
		return <Loader />
	}

	return (
		<>
			<BlockThemeContainer
				title={chatData.title}
				user={chatData.users.find((obj) => obj.user.id === chatData.creatorId)?.user}
				countMessages={messages.length}
				createdAt={chatData.createdAt}
				actionMoveFromChat={handleLeaveChat}
				arrayActions={[
					<Action
						nameAction='Обновить пользователей'
						action={handleAddUser}
						key='add'
					/>,
				]}
				flag
				isChat
			/>

			{messages.length
				? messages.map((message) => {
						return (
							<ChatMessage
								deleteMessageAction={handleDeleteMessage}
								isChat
								key={message.id}
								{...message}
							/>
						)
					})
				: 'Напишите свое первое сообщение'}
			{searchUsersModalOpen && (
				<ModalCreateOrModalSearch
					isSearchUsers
					usersInChat={chatData.users}
				/>
			)}
			<CreateMessage onKeyDown={handleKeyDown} />
		</>
	)
}
