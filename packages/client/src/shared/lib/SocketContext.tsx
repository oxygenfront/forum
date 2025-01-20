import { selectUserData } from '@/features/Auth'
import { useAppSelector } from '@/shared/lib/hooks'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketContextType {
	socket: Socket | null
	connected: boolean
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocket = (): SocketContextType => {
	const context = useContext(SocketContext)
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider')
	}
	return context
}

interface SocketProviderProps {
	children: React.ReactNode
	chatId?: string // chatId теперь опциональный
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, chatId }) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [connected, setConnected] = useState(false)
	const { id } = useAppSelector(selectUserData)

	useEffect(() => {
		if (!id) {
			return
		}

		// Создаем подключение к сокету с использованием только userId
		const socketOptions: { query: { userId: string; chatId?: string } } = {
			transports: ['websocket'],
			query: { userId: id },
		}

		// Если chatId существует, добавляем его в параметры
		if (chatId) {
			socketOptions.query.chatId = chatId
		}

		// Создаем соединение
		const socketConnection = io('http://localhost:8080', socketOptions)

		socketConnection.on('connect', () => {
			setConnected(true)
		})

		socketConnection.on('disconnect', () => {
			setConnected(false)
		})

		setSocket(socketConnection)

		return () => {
			socketConnection.disconnect()
			setSocket(null)
		}
	}, [id, chatId]) // Подключение зависит от id и chatId (если он есть)

	return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>
}
