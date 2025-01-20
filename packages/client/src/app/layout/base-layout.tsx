import 'dayjs/locale/ru'
import { SocketProvider } from '@/shared/lib/SocketContext'
import { Layout } from '@/shared/ui'
import type { FC } from 'react'
import { useParams } from 'react-router-dom'

export const BaseLayout: FC = () => {
	const { id: chatId } = useParams()

	return (
		<SocketProvider chatId={chatId}>
			<Layout />
		</SocketProvider>
	)
}
