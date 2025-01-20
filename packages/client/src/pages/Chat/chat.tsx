import { selectUserData } from '@/features/Auth'
import { CreateMessage, clearData, selectMessage } from '@/features/CreateMessage'
import { useGetChatQuery } from '@/pages/Chat/api'
import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChatMessage } from '@/shared/types/chat.types'
import { BlockThemeContainer } from '@/shared/ui'
import { selectReply } from '@/shared/ui/ReplyedMessage'
import { ChatMessage } from '@/widgets/ChatMessageBlock'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Chat = () => {
	const dispatch = useAppDispatch()

	const { id: chatId } = useParams()
	const [messages, setMessages] = useState<IChatMessage[]>([])
	const navigate = useNavigate()
	const { id: userId } = useAppSelector(selectUserData)
	const selectDataMessage = useAppSelector(selectMessage)
	const { chatReplyMessages } = useAppSelector(selectReply)
	const { data, error } = useGetChatQuery({ chatId, userId }, { skip: !(chatId && userId) })

	const { socket } = useSocket()
	useEffect(() => {
		if (chatId && socket) {
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
		}
	}, [chatId, socket])

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
			} else {
				socket.emit('sendMessage', messageData)
				dispatch(clearData())
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

	if ((error as { status: number })?.status === 403) {
		return 'Чат не найден'
	}

	return (
		<>
			{data?.title ? (
				<BlockThemeContainer
					title={data.title}
					user={data.users.find((obj) => obj.user.id === data.creatorId)?.user}
					countMessages={messages.length}
					createdAt={data.createdAt}
					actionMoveFromChat={handleLeaveChat}
					flag
					isChat
				/>
			) : null}
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
			<CreateMessage onKeyDown={handleKeyDown} />
		</>
	)
}
