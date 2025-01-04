import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import classNames from 'classnames'
import { type FC, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlinePermMedia } from 'react-icons/md'
import styles from './accordion.module.sass'
export const ChatMediaAccordion: FC = () => {
	const [expandedParent, setExpandedParent] = useState(true)
	const [expandedChild, setExpandedChild] = useState(false)

	const handleParentChange = () => {
		setExpandedParent(!expandedParent)
		setExpandedChild(false)
	}

	const handleChildChange = () => {
		setExpandedChild(!expandedChild)
	}

	return (
		<>
			<Accordion
				expanded={expandedParent}
				onChange={handleParentChange}
				sx={{
					color: '#FFFF',
					backgroundColor: '#20242D',
					borderRadius: '25px !important',
					border: '2px solid #FFFFFF1F',
					width: '414px',
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
							gap: '10px',
							alignItems: 'center',
							fontSize: '20px',
							flexGrow: 1,
						},
					}}
				>
					<MdOutlinePermMedia /> Медиа
				</AccordionSummary>
				<hr className={classNames(styles.hr, { [styles.expanded]: expandedParent })} />
				<AccordionDetails>
					<div className={styles.info}>
						Медиа:
						<div className={styles.row}>
							<p className={styles.subtitle}>Всего отправлено за все время:</p>
							<p className={styles.count}>300</p>
						</div>
					</div>

					<div className={styles.media_grid}>
						<hr className={classNames(styles.hr, { [styles.expanded]: expandedParent })} />
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<hr className={styles.hr} />
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<img
							className={styles.media_grid_item}
							src='https://i.imgur.com/A5jCy4B.png'
							alt=''
						/>
						<hr className={styles.hr} />
					</div>
					<Accordion
						expanded={expandedChild}
						onChange={handleChildChange}
						sx={{
							color: '#FFFF',
							backgroundColor: '#20242D',
							boxShadow: 'none',
							display: 'flex',
							flexDirection: 'column-reverse',
							'&.Mui-expanded': {
								marginTop: '8px',
							},
						}}
					>
						<AccordionSummary
							expandIcon={
								<IoIosArrowDown
									fontSize='24px'
									color='#FFFFFF'
								/>
							}
							aria-controls='panel2-content'
							id='panel2-header'
							sx={{
								'& .MuiAccordionSummary-content': {
									flexGrow: 0,
								},
								gap: '15px',
								fontWeight: '300',
							}}
						>
							Еще 30 медиа
						</AccordionSummary>
						<AccordionDetails sx={{ padding: 0 }}>
							<div className={styles.media_grid}>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<hr className={styles.hr} />
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<img
									className={styles.media_grid_item}
									src='https://i.imgur.com/A5jCy4B.png'
									alt=''
								/>
								<hr className={styles.hr} />
							</div>
						</AccordionDetails>
					</Accordion>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
