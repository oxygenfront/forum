import type { FC } from 'react'
import { useParams } from 'react-router-dom'

export const ChapterPage: FC = () => {
	const { chapterId } = useParams()
	return <>{chapterId}</>
}
