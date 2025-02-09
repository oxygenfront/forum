import { selectUserData } from '@/features/Auth'
import { useDebounce, useOutsideClick } from '@/shared/lib'
import { useSocket } from '@/shared/lib/SocketContext'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IChatUser } from '@/shared/types/chat.types'
import {
	addUserInChat,
	changeMessage,
	changeTitle,
	clearData,
	selectModalNewChatOrSearchUsersSlice,
	toggleCreateModalOpen,
	toggleSearchUserModalOpen,
	useCreateChatMutation,
	useSearchUsersQuery,
} from '@/widgets/ModalCreateOrModalSearch'
import { Autocomplete, Chip, TextField, Typography } from '@mui/material'
import classnames from 'classnames'
import classNames from 'classnames'
import { FC, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './modal.module.sass'

interface IModalCreateOrModalSearch {
	isSearchUsers?: boolean
	usersInChat?: IChatUser[]
}

export const ModalCreateOrModalSearch: FC<IModalCreateOrModalSearch> = ({ isSearchUsers, usersInChat }) => {
	const dispatch = useAppDispatch()
	const { chatId } = useParams()
	const { id, userLogin, userEmail, avatarColor = '', userImage = '' } = useAppSelector(selectUserData)
	const { addedUsers, title, message } = useAppSelector(selectModalNewChatOrSearchUsersSlice)
	const ref = useRef<HTMLDivElement | null>(null)
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const [inputValue, setInputValue] = useState('')
	const { socket, connected } = useSocket()
	const [isFocused, setIsFocused] = useState(false)
	const debouncedValue = useDebounce(inputValue, 500)
	const { data: users = [], isLoading } = useSearchUsersQuery(debouncedValue)
	const [createChat, { isSuccess }] = useCreateChatMutation()

	useEffect(() => {
		if (isSearchUsers && usersInChat) {
			for (const user of usersInChat) {
				dispatch(
					addUserInChat({
						id: user.user.id,
						userLogin: user.user.userLogin,
						userEmail: user.user.userEmail,
						avatarColor: user.user.avatarColor,
						userImage: user.user.userImage,
					}),
				)
			}
			return
		}
		dispatch(addUserInChat({ id, userLogin, userEmail, avatarColor, userImage }))
	}, [])

	useEffect(() => {
		if (isSuccess) {
			dispatch(clearData())
		}
	}, [isSuccess])

	const adjustHeight = () => {
		if (isSearchUsers) {
			return
		}
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}
	useEffect(() => {
		if (isSearchUsers) {
			return
		}
		if (textareaRef.current) {
			textareaRef.current.focus()
		}
		adjustHeight()
	}, [message])

	const handleUserChange = (_: any, newValue: typeof users) => {
		if (newValue) {
			for (const user of newValue) {
				dispatch(addUserInChat(user))
			}
		}
	}

	const filterUsers = (input: string) => {
		if (input) {
			return users.filter(
				(user) =>
					user.userLogin.toLowerCase().includes(input.toLowerCase()) && !addedUsers.find((u) => u.id === user.id),
			)
		}
		return users.filter((user) => !addedUsers.find((u) => u.id === user.id))
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			const filteredUsers = filterUsers(inputValue)
			if (filteredUsers.length > 0) {
				const firstUser = filteredUsers[0]
				if (!addedUsers.find((u) => u.id === firstUser.id)) {
					dispatch(addUserInChat(firstUser))
				}
				setInputValue('')
			}
		}
	}

	const renderNoOptions = () => {
		if (inputValue === '') {
			return (
				<Typography
					sx={{
						color: 'white',
						fontSize: '14px',
						textAlign: 'center',
					}}
				>
					Введите логин пользователя для поиска
				</Typography>
			)
		}
		if ((isLoading || debouncedValue) && !users.length) {
			return (
				<Typography
					sx={{
						color: 'white',
						fontSize: '14px',
						textAlign: 'center',
					}}
				>
					Пользователь не найден
				</Typography>
			)
		}
		return (
			<Typography
				sx={{
					color: 'white',
					fontSize: '14px',
					textAlign: 'center',
				}}
			>
				Поиск ...
			</Typography>
		)
	}

	const handleTitleChange = (event: any) => {
		dispatch(changeTitle(event.target.value))
	}

	const handleCreateChat = () => {
		createChat({ creatorId: id, userIds: addedUsers.map((u) => u.id), title, message })
	}

	const handleOnCloseModal = () => {
		dispatch(toggleCreateModalOpen())
		dispatch(toggleSearchUserModalOpen())
	}

	const handleUpdateUsersChat = () => {
		if (socket && connected) {
			socket.emit('updateUsersInChat', { chatId, userIds: addedUsers.map((u) => u.id) })
		}
		handleOnCloseModal()
	}

	useOutsideClick(ref, handleOnCloseModal)

	return (
		<div className={styles.wrapper}>
			<div
				className={classnames(styles.modal, { [styles.isSearchUsers]: isSearchUsers })}
				ref={ref}
			>
				<div className={styles.input_block}>
					<p>{isSearchUsers ? 'Добавить пользователей в чат:' : 'Получатели:'}:</p>
					<Autocomplete
						multiple
						getOptionLabel={(option) => option.userLogin}
						options={filterUsers(inputValue)}
						value={addedUsers}
						onClose={() => setInputValue('')}
						noOptionsText={renderNoOptions()}
						onChange={handleUserChange}
						onInputChange={(_, newInputValue) => {
							setInputValue(newInputValue)
						}}
						onKeyDown={handleKeyDown}
						renderTags={(tagValue, getTagProps) => {
							return tagValue.map((option, index) => {
								const { key, ...tagProps } = getTagProps({ index })
								return (
									<Chip
										key={key}
										label={option.userLogin}
										{...tagProps}
										sx={{
											backgroundColor: 'transparent',
											color: '#00FFE0',
											border: '1px solid #1976d2',
											'&.Mui-disabled': {
												opacity: 0.3,
											},
											'& .MuiChip-deleteIcon': {
												color: '#1976d2',
												transition: 'all .2s linear',
												'&:hover': {
													opacity: 0.2,
													color: '#1976d2',
												},
											},
										}}
										disabled={
											isSearchUsers
												? false
												: addedUsers.map((us) => us.id).includes(option.id) /*usersInChat && usersInChat.length === 1
												? usersInChat.map((us) => us.user.id).includes(option.id)
												: addedUsers.map((us) => us.id).includes(option.id)*/
										}
									/>
								)
							})
						}}
						slotProps={{
							paper: {
								sx: {
									backgroundColor: '#333',
									borderRadius: '8px',
									padding: '15px 0',
									'& .MuiAutocomplete-listbox': {
										width: '100%',
										backgroundColor: '#333',
										color: '#fff',
										maxHeight: '300px',
										overflowY: 'auto',
										scrollbarWidth: 'revert-layer',

										'&::-webkit-scrollbar': {
											width: '5px',
										},
										'&::-webkit-scrollbar-track': {
											backgroundColor: '#333',

											borderRadius: '8px',
										},
										'&::-webkit-scrollbar-thumb': {
											backgroundColor: '#1976d2',
											borderRadius: '30px',
											transition: 'background-color 0.3s',
										},
										'&::-webkit-scrollbar-thumb:hover': {
											backgroundColor: '#00FFE0',
										},
									},
								},
							},
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder='Добавьте участников'
								sx={{
									'& .MuiInputLabel-root': {
										color: '#666',
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#1976d2',
									},
									'& .MuiOutlinedInput-root': {
										color: 'white',
										'& fieldset': {
											transition: 'all .2s linear',
											border: '2px solid #FFFFFF59',
										},
										'&:hover fieldset': {
											borderColor: 'rgba(255,255,245,0.6)',
										},
										'&.Mui-focused fieldset': {
											borderColor: '#1976d2',
										},
									},
									'& .MuiAutocomplete-popupIndicator': {
										color: '#00FFE0',
										'&:hover': {
											color: '#1976d2',
										},
									},
									'& .MuiAutocomplete-clearIndicator': {
										color: '#00FFE0',
										'&:hover': {
											color: '#d32f2f',
										},
									},
									'& .MuiInputBase-input::placeholder': {
										color: '#666',
										opacity: 1,
									},
								}}
							/>
						)}
					/>
					<p className={styles.subtitle}>*Можно добавить несколько участников в чат</p>
				</div>

				{isSearchUsers ? (
					<div className={styles.button}>
						<button
							type='button'
							className={styles.button_create}
							onClick={handleUpdateUsersChat}
						>
							Обновить пользователей чата
						</button>
					</div>
				) : (
					<>
						<div className={styles.input_block}>
							<p>Заголовок:</p>
							<TextField
								onChange={handleTitleChange}
								value={title}
								sx={{
									'& .MuiInputLabel-root': {
										color: '#666',
									},
									'& .MuiInputLabel-root.Mui-focused': {
										color: '#1976d2',
									},
									'& .MuiOutlinedInput-root': {
										color: 'white',
										'& fieldset': {
											transition: 'all .2s linear',
											border: '2px solid #FFFFFF59',
										},
										'&:hover fieldset': {
											borderColor: 'rgba(255,255,245,0.6)',
										},
										'&.Mui-focused fieldset': {
											borderColor: '#1976d2',
										},
									},
									'& .MuiAutocomplete-popupIndicator': {
										color: '#00FFE0',
										'&:hover': {
											color: '#1976d2',
										},
									},
									'& .MuiAutocomplete-clearIndicator': {
										color: '#00FFE0',
										'&:hover': {
											color: '#d32f2f',
										},
									},
									'& .MuiInputBase-input::placeholder': {
										color: '#666',
										opacity: 1,
									},
								}}
								placeholder='Введите заголовок чата'
							/>
						</div>

						<div className={styles.input_block}>
							<textarea
								ref={textareaRef}
								className={classNames(styles.textarea, { [styles.focus]: isFocused })}
								contentEditable
								suppressContentEditableWarning={true}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								value={message}
								onChange={(e) => dispatch(changeMessage(e.target.value))}
								placeholder='Написать сообщение'
							/>
						</div>

						<div className={styles.button}>
							<button
								type='button'
								className={styles.button_create}
								onClick={() => handleCreateChat()}
							>
								Создать новый чат
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
