import { selectUserData } from '@/features/Auth'
import { CreateMessage, selectMessage, setValue } from '@/features/CreateMessage'
import { useGetChatQuery } from '@/pages/Chat/api'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChatMessage } from '@/shared/types/chat.types'
import { BlockThemeContainer, Loader } from '@/shared/ui'
import { clearData, selectReply } from '@/shared/ui/ReplyedMessage'
import { ChatMessage } from '@/widgets/ChatMessageBlock'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'

export const Chat = () => {
	const dispatch = useAppDispatch()

	const { id: chatId } = useParams()
	const [socket, setSocket] = useState<Socket | null>(null)
	const [connected, setConnected] = useState(false)
	const [messages, setMessages] = useState<IChatMessage[]>([])

	const { id: userId } = useAppSelector(selectUserData)
	const selectDataMessage = useAppSelector(selectMessage)
	const { chatReplyMessages } = useAppSelector(selectReply)
	const { data } = useGetChatQuery(chatId, { skip: !chatId })

	useEffect(() => {
		if (chatId && userId) {
			const socketConnection = io('http://localhost:8080', {
				transports: ['websocket'],
				query: { userId, chatId },
			})

			socketConnection.on('connect', () => {
				setConnected(true)
				// Подключаем пользователя к чату
				socketConnection.emit('joinChat', { chatId, userId })
			})

			socketConnection.on('disconnect', () => {
				setConnected(false)
			})

			socketConnection.on('messageRemoved', ({ id }) => {
				setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
			})

			socketConnection.on('messageUpdated', (updatedMessage) => {
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

			// Получаем текущие сообщения чата
			socketConnection.on('chatMessages', (chatMessages) => {
				setMessages(chatMessages)
			})

			// Получаем новое сообщение
			socketConnection.on('newMessage', (message) => {
				setMessages((prevMessages) => [...prevMessages, message])
			})

			// Сохраняем сокет в состояние
			setSocket(socketConnection)
			return () => {
				socketConnection.disconnect()
				setSocket(null)
			}
		}
	}, [chatId, userId])
	// biome-ignore lint/suspicious/noConsoleLog: <explanation>
	console.log(messages)
	// Обработка ввода нового сообщения
	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && socket) {
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
				dispatch(setValue({ content: '' }))
				dispatch(clearData())
			} else {
				socket.emit('sendMessage', messageData)
				dispatch(setValue({ content: '' }))
				dispatch(clearData())
			}
		}
	}

	const handleDeleteMessage = (id: string) => {
		if (socket) {
			socket.emit('removeMessage', { id, chatId })

			setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id))
		}
	}

	if (!connected) {
		return <Loader />
	}

	return (
		<>
			{data?.title ? (
				<BlockThemeContainer
					title={data.title}
					user={data.users.find((obj) => obj.user.id === data.creatorId)?.user}
					createdAt={data.createdAt}
					flag
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
