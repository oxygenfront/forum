import { selectUserData } from '@/features/Auth'
import { useAppSelector } from '@/shared/lib/hooks'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'

interface SocketContextType {
	socket: Socket | null
	connected: boolean
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocket = (): SocketContextType => {
	const context = useContext(SocketContext)

	return context as SocketContextType
}

interface SocketProviderProps {
	children: React.ReactNode
	chatId?: string
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [connected, setConnected] = useState(false)
	const { chatId } = useParams()
	const { id } = useAppSelector(selectUserData)
	useEffect(() => {
		if (!id) {
			return
		}

		const socketOptions: { query: { userId: string; chatId?: string } } = {
			query: { userId: id },
		}

		if (chatId) {
			socketOptions.query.chatId = chatId
		}

		const socketConnection = io('http://localhost:8080', {
			...socketOptions,
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 1000,
			reconnectionAttempts: 5,
			transports: ['websocket'],
		})

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
	}, [id, chatId])

	return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>
}
