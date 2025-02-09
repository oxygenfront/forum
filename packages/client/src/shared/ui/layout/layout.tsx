import { selectIsLogin, selectUserData, useGetAuthQuery } from '@/features/Auth'
import { selectChatData, setChatData } from '@/pages/Chat/model'
import { PATH, initChatData } from '@/shared/constants'
import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks.ts'
import type { IChatData, IError } from '@/shared/types'
import { Container } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styles from './layout.module.sass'

export const Layout: FC = () => {
	const { pathname } = useLocation()
	const { chatId } = useParams()
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector(selectIsLogin)
	const { id: userId } = useAppSelector(selectUserData)
	const chatData = useAppSelector(selectChatData)
	const navigate = useNavigate()
	const { socket } = useSocket()
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const [error, setError] = useState<IError>()

	useGetAuthQuery(undefined, { skip: isLogin })
	const isLoggedUser = isLogin || localStorage.getItem('token') || sessionStorage.getItem('token')

	useEffect(() => {
		if (!socket) {
			return
		}

		socket.on('error', (error: IError) => {
			setError(error)
		})

		if (!error) {
			if (chatId && userId && JSON.stringify(chatData) === JSON.stringify(initChatData)) {
				socket.emit('getInfoChat', { userId, chatId })
			}

			socket.on('newMessage', (message) => {
				if (message.user.id !== userId && chatId !== message.chatId) {
					enqueueSnackbar(`${message.user.userLogin} написал(а): ${message.content}`, {
						variant: 'info',
						action: (key) => (
							<button
								style={{
									padding: '7px',
									marginRight: '10px',
									backgroundColor: '#003d86',
									borderRadius: '5px',
								}}
								type='button'
								onClick={() => {
									navigate(`/chats/${message.chatId}`)
									closeSnackbar(key)
								}}
							>
								Чат
							</button>
						),
					})
				}
			})

			socket.on('getInfoChat', (data: IChatData) => {
				dispatch(setChatData(data))
			})
		}

		return () => {
			socket.off('newMessage')
			socket.off('getInfoChat')
			socket.off('error')
		}
	}, [socket, chatId, error])

	return (
		<>
			<Container>
				<Header />
				{!(pathname.split('/').includes('profile') || isLoggedUser) && <HelloBlock />}
				<main className={styles.main}>
					<Main />
					{pathname !== PATH.ALL_CHATS && <Aside />}
				</main>
			</Container>
			<Footer />
		</>
	)
}
