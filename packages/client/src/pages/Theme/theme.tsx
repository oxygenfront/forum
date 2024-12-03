import { selectIsLogin, selectUserData } from '@/features/Auth'
import {
	CreateMessage,
	selectMessage,
	setValue,
	useCreateMessageMutation,
	useUpdateMessageMutation,
} from '@/features/CreateMessage'
import { useGetThemePageQuery } from '@/pages/Theme'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { BlockThemeContainer, LoginForAction } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { selectCurrentPage } from '@/shared/ui/Pagination'
import { Pagination } from '@/shared/ui/Pagination/pagination'
import { clearData, selectReply } from '@/shared/ui/ReplyedMessage'
import { Message } from '@/widgets/MessageBlock'
import classNames from 'classnames'
import { FC, KeyboardEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './theme.module.sass'

export const ThemePage: FC = () => {
	const { id } = useParams()
	const storedCurrentPage = useAppSelector(selectCurrentPage)
	const { data, isLoading } = useGetThemePageQuery({ id, page: storedCurrentPage }, { skip: !id })

	const { id: userId } = useAppSelector(selectUserData)
	const selectDataMessage = useAppSelector(selectMessage)
	const { replyMessages } = useAppSelector(selectReply)
	const dispatch = useAppDispatch()
	const [createMessage, { isSuccess: isSuccessCreate }] = useCreateMessageMutation()
	const [updateMessage, { isSuccess: isSuccessUpdate }] = useUpdateMessageMutation()

	const [themeId, setThemeId] = useState('')

	const isLogin = useAppSelector(selectIsLogin)

	const conditionalForShow = isLoading || !data

	useEffect(() => {
		if (data) {
			setThemeId(data.id)
		}
		return () => setThemeId('')
	}, [data])

	useEffect(() => {
		if (isSuccessUpdate || isSuccessCreate) {
			dispatch(setValue({ content: '', isEdit: false }))
		}
	}, [isSuccessUpdate, isSuccessCreate])

	if (conditionalForShow) {
		return <Loader loading={isLoading} />
	}

	const handleActionMessage = () => {
		if (selectDataMessage.isEdit) {
			updateMessage({
				id: selectDataMessage.messageId ?? '',
				content: selectDataMessage.content ?? '',
			})
		} else if (selectDataMessage.content?.length) {
			if (replyMessages.length) {
				createMessage({
					content: selectDataMessage.content,
					themeId,
					userId: userId,
					parentMessageIds: replyMessages.map((message) => message.id),
				})
			} else {
				createMessage({
					content: selectDataMessage.content,
					themeId,
					userId: userId,
				})
			}

			dispatch(clearData())
		}
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && selectDataMessage.content !== '') {
			event.preventDefault()
			handleActionMessage()
		}
	}
	const handleCancelEdit = () => {
		dispatch(setValue({ isEdit: false, content: '' }))
	}
	return (
		<>
			{data ? (
				<>
					<BlockThemeContainer
						flag
						title={data.themeTitle}
						createdAt={data.createdAt}
						user={data.user}
						views={data.views ?? 0}
						countThemeMessages={data.countThemeMessages}
					/>
					{data.themeMessages.length !== 0 ? (
						<>
							{data.themeMessages.map((message) => {
								if (themeId === '') {
									setThemeId(message.themeId)
								}
								return (
									<Message
										key={message.id}
										{...message}
										userThemeId={data.userId}
									/>
								)
							})}
						</>
					) : (
						'Сообщений по этой теме нет'
					)}
				</>
			) : (
				'К сожалению тут ничего нет'
			)}
			<>
				{isLogin && <CreateMessage onKeyDown={handleKeyDown} />}
				<div className={classNames(styles.theme_actions, { [styles.noPagination]: !data.meta.totalPages })}>
					{data.meta.totalPages ? <Pagination meta={data.meta} /> : null}
					{isLogin ? (
						<div className={styles.buttons}>
							<button
								type='button'
								className={styles.button}
								onClick={handleActionMessage}
								disabled={selectDataMessage.content === ''}
							>
								{selectDataMessage.isEdit ? 'Редактировать' : 'Комментировать'}
							</button>
							{selectDataMessage.isEdit && (
								<button
									type='button'
									className={styles.button}
									onClick={handleCancelEdit}
								>
									Отменить редактирование
								</button>
							)}
						</div>
					) : (
						<LoginForAction />
					)}
				</div>
			</>
		</>
	)
}
