import { selectUserData } from '@/features/Auth'
import { CreateMessage } from '@/features/CreateMessage'
import { useGetChatQuery } from '@/pages/Chat/api'
import { useAppSelector } from '@/shared/lib/hooks'
import { BlockThemeContainer, Loader } from '@/shared/ui'
import { Message } from '@/widgets/MessageBlock'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'
export const Chat = () => {
	const { id: chatId } = useParams()
	const { id: userId } = useAppSelector(selectUserData)
	const [socket, setSocket] = useState<Socket | null>(null)
	const [connected, setConnected] = useState(false)

	const { data, isLoading } = useGetChatQuery(chatId, { skip: !chatId })

	useEffect(() => {
		if (chatId && userId) {
			const socketConnection = io('http://localhost:8080', {
				transports: ['websocket'],
				query: { userId },
			})

			socketConnection.on('connect', () => {
				setConnected(true)
				console.log('Connected to WebSocket server')
				socketConnection.emit('setUserId', 'f157758c-e3f8-4f98-8bc4-3b2cbee04d7e')
				// Подключаем пользователя к чату
				socketConnection.emit('joinChat', { chatId, userId })
			})

			socketConnection.on('disconnect', () => {
				setConnected(false)
				console.log('Disconnected from WebSocket server')
			})

			socketConnection.on('newMessage', (message) => {
				console.log('Received new message:', message)
			})

			// Сохраняем сокет в состояние
			setSocket(socketConnection)

			// Очистка при размонтировании компонента
			return () => {
				socketConnection.disconnect()
				console.log('Socket disconnected')
			}
		}
	}, [chatId, userId])

	if (data === undefined && isLoading) {
		return <Loader />
	}

	return (
		<>
			{data?.title ? (
				<BlockThemeContainer
					title={data?.title}
					user={data?.users.find((obj) => obj.user.id === data.creatorId)?.user}
				/>
			) : null}
			{data?.chatMessages.length
				? data.chatMessages.map((message) => {
						return (
							<Message
								key={message.id}
								{...message}
							/>
						)
					})
				: 'Напишите свое первое сообщение'}
			<CreateMessage />
		</>
	)
}
