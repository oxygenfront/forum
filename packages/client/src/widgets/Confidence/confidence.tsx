import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import classnames from 'classnames'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './confidence.module.sass'
export const Confidence = ({ userEmail }: { userEmail: string }) => {
	const [expanded, setExpanded] = useState(true)
	const [value, setValue] = useState<string>()

	return (
		<>
			<Accordion
				expanded={expanded}
				onChange={() => setExpanded(!expanded)}
				sx={{
					color: '#FFFF',
					backgroundColor: 'transparent',
					boxShadow: 'none',
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
							fontSize: '24px',
							flexGrow: 1,
						},
						backgroundColor: '#20242D',
						border: '2px solid #FFFFFF1F',
						borderRadius: '25px !important',
						mb: '12px',
					}}
				>
					Безопасность
				</AccordionSummary>
				<AccordionDetails
					sx={{ backgroundColor: '#20242D', border: '2px solid #FFFFFF1F', borderRadius: '25px !important' }}
				>
					<div className={styles.wrapper}>
						<div className={styles.up}>
							<div className={classnames(styles.input, styles.block)}>{userEmail}</div>
							<div className={styles.up_about}>
								<p className={styles.up_about_title}>Почта</p>
								<p className={styles.up_about_desc}>Текущая электронная почта</p>
							</div>
						</div>
						<div className={styles.middle}>
							<div className={styles.up}>
								<input
									value={value}
									onChange={(e) => setValue(e.target.value)}
									placeholder=''
									type='text'
									className={styles.input}
								/>
								<div className={styles.up_about}>
									<p className={styles.up_about_title}>Смена текущей почты</p>
									<p className={styles.up_about_desc}>
										Введите адрес новой почты для смены текущей <br />
										почты
									</p>
								</div>
							</div>
						</div>
						<div className={styles.bottom}>
							<button
								type='button'
								className={styles.bottom_button}
							>
								Сменить почту
							</button>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
