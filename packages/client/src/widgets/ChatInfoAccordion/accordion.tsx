import { trimmingText } from '@/shared/lib'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import classNames from 'classnames'
import { useState } from 'react'
import { IoIosArrowDown, IoMdInformationCircleOutline } from 'react-icons/io'
import { IoPeopleSharp } from 'react-icons/io5'
import { TbBrandWechat } from 'react-icons/tb'

import styles from './acrodion.module.sass'

export const ChatInfoAccordion = () => {
	const [expanded, setExpanded] = useState(true)

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
							<p className={styles.subtitle}>{trimmingText(['Oxygen32', 'Oxygen123'].join(', '))}</p>
						</div>

						<div className={styles.members_right}>
							<img
								src='https://i.imgur.com/A5jCy4B.png'
								alt=''
								className={styles.members_avatar}
							/>
							<img
								src='https://i.imgur.com/A5jCy4B.png'
								alt=''
								className={styles.members_avatar}
							/>
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
							<p className={styles.count}>300</p>
						</div>
						<div className={styles.row}>
							<p className={styles.subtitle}>Первое сообщение:</p>
							<p className={styles.count}>12.02.24</p>
						</div>
						<div className={styles.row}>
							<p className={styles.subtitle}>Последние сообщение:</p>
							<p className={styles.count}>15.02.24</p>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
