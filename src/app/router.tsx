import { BaseLayout as App } from '@/app/layout'
import { ChapterPage } from '@/pages/Chapter/chapter'
import { ThemePage } from '@/pages/Theme'
import { WarrantorPage } from '@/pages/Warrantor'
import { Path } from '@/shared/model'
import {ComentTheme} from "@/widgets/ComentTheme"
// import { Profile } from '@/layout/Profile'
import { ChaptersBlock } from '@/widgets/ChaptersBlock'
import { createBrowserRouter } from 'react-router-dom'
export const router = createBrowserRouter([
	{
		path: Path.BASE,
		element: <App />,
		children: [
			{
				path: Path.BASE,
				element: <ChaptersBlock />,
			},
			{
				path: Path.WARRANTOR,
				element: <WarrantorPage />,
			},
			{
				path: Path.CHAPTER,
				element: <ChapterPage />,
			},
			{
				path: Path.THEME,
				element: <ThemePage />,
			},
			{
				path: Path.TEST,
				element: <ComentTheme />,
			},
		],
	},
])
