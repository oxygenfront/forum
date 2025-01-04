import { BlockContainer, ChapterLink } from '@/shared/ui'
import { useGetChaptersQuery } from '@/widgets/ChaptersLinks'
import type { FC } from 'react'
export const ChaptersLinksBlock: FC = () => {
	const { data, isLoading } = useGetChaptersQuery()

	if (isLoading || !data) {
		return
	}
	return (
		<>
			<BlockContainer
				title='Форум'
				mod='links-block'
			>
				{data.map((el) => (
					<ChapterLink
						key={el.id}
						{...el}
					/>
				))}
			</BlockContainer>
		</>
	)
}
