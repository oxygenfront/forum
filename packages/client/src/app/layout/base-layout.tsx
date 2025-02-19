import 'dayjs/locale/ru'
import { useSocket } from '@/shared/lib/SocketContext'
import { Layout, Loader } from '@/shared/ui'
import type { FC } from 'react'

export const BaseLayout: FC = () => {
	const socketContext = useSocket()

	if (!socketContext) {
		return <Loader />
	}

	return <Layout />
}
