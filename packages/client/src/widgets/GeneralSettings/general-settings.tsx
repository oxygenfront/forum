import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { type FC, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import styles from './general-settings.module.sass'

interface GeneralSettingsProps {
	is_show_animated_avatar: boolean
	is_close_wall_on_change: boolean
	is_show_status_online: boolean
	is_private: boolean
}

export const GeneralSettings: FC<GeneralSettingsProps> = () => {
	const [expanded, setExpanded] = useState(true)
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
					Внешний вид профиля
				</AccordionSummary>
				<AccordionDetails
					sx={{ backgroundColor: '#20242D', border: '2px solid #FFFFFF1F', borderRadius: '25px !important' }}
				>
					<div className={styles.wrapper}>
						<div className={styles.up}>
							<div className={styles.container}>
								<div className={styles.checkbox}>
									<input
										className={styles.checkbox_input}
										type='checkbox'
										id='lock-wall'
									/>
									<div className={styles.checkbox_content}>
										<label
											className={styles.checkbox_content_title}
											htmlFor={'lock-wall'}
										>
											Закрыть стену от изменений пользователей
										</label>
										<p className={styles.checkbox_content_desc}>Это делается для того...</p>
									</div>
								</div>
								<div className={styles.about}>
									<p className={styles.about_title}>Настройки форума</p>
									<p className={styles.about_desc}>Регистрация</p>
								</div>
							</div>
							<div className={styles.checkbox}>
								<input
									className={styles.checkbox_input}
									type='checkbox'
									id='lock-wall'
								/>
								<div className={styles.checkbox_content}>
									<label
										className={styles.checkbox_content_title}
										htmlFor='lock-wall'
									>
										Закрыть стену от изменений пользователей
									</label>
									<p className={styles.checkbox_content_desc}>Это делается для того...</p>
								</div>
							</div>
							<div className={styles.checkbox}>
								<input
									className={styles.checkbox_input}
									type='checkbox'
									id='lock-wall'
								/>
								<div className={styles.checkbox_content}>
									<label
										className={styles.checkbox_content_title}
										htmlFor='lock-wall'
									>
										Закрыть стену от изменений пользователей
									</label>
									<p className={styles.checkbox_content_desc}>Это делается для того...</p>
								</div>
							</div>
						</div>
						<div className={styles.middle}>
							<div className={styles.container}>
								<div className={styles.checkbox}>
									<input
										className={styles.checkbox_input}
										type='checkbox'
										id='lock-wall'
									/>
									<div className={styles.checkbox_content}>
										<label
											className={styles.checkbox_content_title}
											htmlFor='lock-wall'
										>
											Закрыть стену от изменений пользователей
										</label>
										<p className={styles.checkbox_content_desc}>Это делается для того...</p>
									</div>
								</div>
								<div className={styles.about}>
									<p className={styles.about_title}>Настройки форума</p>
									<p className={styles.about_desc}>Регистрация</p>
								</div>
							</div>
						</div>
						<div className={styles.bottom}>
							<div>
								<button
									type='button'
									className={styles.bottom_cancel}
								>
									Отмена
								</button>
							</div>
							<div>
								<button
									type='button'
									className={styles.bottom_save}
								>
									Сохранить
								</button>
							</div>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
