import { BaseLayout as App } from '@/app/layout'
import { AllChatsPages } from '@/pages/AllChats'
import { ChapterPage } from '@/pages/Chapter'
import { Chat } from '@/pages/Chat'
import { Profile } from '@/pages/Profile'
import { ThemePage } from '@/pages/Theme'
import { WarrantorPage } from '@/pages/Warrantor'
import { PATH } from '@/shared/constants'
import { SocketProvider } from '@/shared/lib/SocketContext'

import { ChaptersLinksBlock } from '@/widgets/ChaptersLinks'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
	[
		{
			path: PATH.BASE,
			element: (
				<SocketProvider>
					<App />
				</SocketProvider>
			),
			children: [
				{
					path: PATH.BASE,
					element: <ChaptersLinksBlock />,
				},
				{
					path: PATH.WARRANTOR,
					element: <WarrantorPage />,
				},
				{
					path: PATH.CHAPTER,
					element: <ChapterPage />,
				},
				{
					path: PATH.THEME,
					element: <ThemePage />,
				},
				{
					path: PATH.PROFILE,
					element: <Profile />,
				},
				{
					path: PATH.ALL_CHATS,
					element: <AllChatsPages />,
				},
				{
					path: PATH.CHAT,
					element: <Chat />,
				},
			],
		},
	],
	{
		future: {
			v7_startTransition: false,
		},
	},
)
