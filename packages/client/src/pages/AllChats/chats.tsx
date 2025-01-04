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

// // const handleOnKeDown = () => {}
// const [connected, setConnected] = useState(false)
// const [socket, setSocket] = useState<Socket | null>(null)
// const [message, setMessage] = useState('')
//
// useEffect(() => {
// 	// Создаем сокет при монтировании компонента
// 	const socketConnection = io('http://localhost:8080', {
// 		transports: ['websocket'], // Используем только WebSocket
// 	})
//
// 	// Обработчик события подключения
// 	socketConnection.on('connect', () => {
// 		setConnected(true)
// 		console.log('Connected to WebSocket server')
//
// 		// Отправляем ID пользователя после успешного подключения
// 		socketConnection.emit('setUserId', 'f157758c-e3f8-4f98-8bc4-3b2cbee04d7e')
// 	})
//
// 	// Обработчик события отключения
// 	socketConnection.on('disconnect', () => {
// 		setConnected(false)
// 		console.log('Disconnected from WebSocket server')
// 	})
//
// 	// Пример обработки новых сообщений
// 	socketConnection.on('newMessage', (message: any) => {
// 		console.log('Received new message:', message)
// 	})
//
// 	// Пример обработки ошибок
// 	socketConnection.on('error', (error: any) => {
// 		console.log('Error:', error)
// 	})
//
// 	// Сохраняем сокет в состояние
// 	setSocket(socketConnection)
//
// 	// Очистка при размонтировании компонента (отключаем сокет)
// 	return () => {
// 		socketConnection.disconnect()
// 		console.log('Socket disconnected')
// 	}
// }, [])
// const sendMessage = () => {
// 	if (message.trim() && socket) {
// 		socket.emit('sendMessage', {
// 			chatId: '011b726b-5962-4ae2-985a-8ac1954a1d29', // Пример ID чата
// 			message: message,
// 		})
//
// 		// Очищаем поле ввода
// 		setMessage('')
// 	}
// }
