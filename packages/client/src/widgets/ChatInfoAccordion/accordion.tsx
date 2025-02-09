import { selectChatData } from '@/pages/Chat/model'
import { timeSincePublication, trimmingText } from '@/shared/lib'
import { useAppSelector } from '@/shared/lib/hooks'
import { Loader } from '@/shared/ui'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import classnames from 'classnames'
import classNames from 'classnames'
import { useState } from 'react'
import { IoIosArrowDown, IoMdInformationCircleOutline } from 'react-icons/io'
import { IoPeopleSharp } from 'react-icons/io5'
import { TbBrandWechat } from 'react-icons/tb'

import styles from './acrodion.module.sass'

export const ChatInfoAccordion = () => {
	const [expanded, setExpanded] = useState(true)
	const chatData = useAppSelector(selectChatData)

	if (!chatData) {
		return <Loader />
	}
	return (
		<>
			<Accordion
				expanded={expanded}
				onChange={() => setExpanded(!expanded)}
				sx={{
					color: '#FFFF',
					backgroundColor: '#20242D',
					borderRadius: '25px !important',
					border: '2px solid #FFFFFF1F',
				}}
			>
				<AccordionSummary
					expandIcon={
						<IoIosArrowDown
							fontSize='24px'
							color='#FFFFFF'
						/>
					}
					aria-controls='panel1-content'
					id='panel1-header'
					sx={{
						'& .MuiAccordionSummary-content': {
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							fontSize: '20px',
							flexGrow: 1,
						},
					}}
				>
					<IoMdInformationCircleOutline
						fontSize='24px'
						color='#FFFFFF'
					/>
					Подробности о чате
				</AccordionSummary>
				<hr className={classNames(styles.hr, { [styles.expanded]: expanded })} />
				<AccordionDetails>
					<div className={styles.members}>
						<div className={styles.members_left}>
							<p className={styles.title}>
								<IoPeopleSharp />
								Участники:
							</p>
							<p className={styles.subtitle}>
								{trimmingText(chatData.users.map((user) => user.user.userLogin).join(', '))}
							</p>
						</div>

						<div className={styles.members_right}>
							{chatData.users.slice(-3).map((user) => {
								return (
									<>
										{user.user.userImage ? (
											<img
												key={user.user.id}
												src={user.user.userImage}
												alt=''
												className={styles.members_avatar}
											/>
										) : (
											<div
												className={classnames(styles.members_avatar, styles.noImg)}
												key={user.user.id}
												style={{ backgroundColor: user.user.avatarColor }}
											>
												{user.user.userLogin[0].toUpperCase()}
											</div>
										)}
									</>
								)
							})}

							<button
								type='button'
								className={styles.add_member}
							>
								+
							</button>
						</div>
					</div>
					<hr className={classNames(styles.hr, styles.expanded)} />
					<div className={styles.messages}>
						<p className={styles.title}>
							<TbBrandWechat />
							Сообщения:
						</p>
						<div className={styles.row}>
							<p className={styles.subtitle}>Всего отправлено за все время:</p>
							<p className={styles.count}>{chatData.messagesCount}</p>
						</div>
						<div className={styles.row}>
							<p className={styles.subtitle}>Последние сообщение:</p>
							<p className={styles.count}>{timeSincePublication(chatData.latestMessageDate)}</p>
						</div>
						<div className={styles.row}>
							<p className={styles.subtitle}>Первое сообщение:</p>
							<p className={styles.count}>{timeSincePublication(chatData.createdAt)}</p>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
