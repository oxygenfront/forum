import { BaseLayout as App } from '@/app/layout'
import { ChapterPage } from '@/pages/Chapter/chapter'
import { ThemePage } from '@/pages/Theme'
import { WarrantorPage } from '@/pages/Warrantor'
import { PATH } from '@/shared/model'
import { ChaptersBlock } from '@/widgets/ChaptersBlock'
import { CommentTheme } from '@/widgets/ComentTheme'
import {Profile} from "@/pages/Profile"
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: PATH.BASE,
		element: <App />,
		children: [
			{
				path: PATH.BASE,
				element: <ChaptersBlock />,
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
				path: PATH.TEST,
				element: <Message />,
			},
			{
				path: PATH.PROFILE,
				element: <Profile/>
			},
		],
	},
])
