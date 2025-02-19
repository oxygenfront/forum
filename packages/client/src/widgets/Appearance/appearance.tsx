import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import classnames from 'classnames'
import { type FC, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TbCameraPlus } from 'react-icons/tb'
import styles from './appearance.module.sass'

interface IAppearanceProps {
	userLogin: string
	userImage: string
	avatarColor: string
}

export const Appearance: FC<IAppearanceProps> = ({ userImage, avatarColor, userLogin }) => {
	const [expanded, setExpanded] = useState(true)
	const [value, setValue] = useState(userLogin)
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
							<div className={styles.inputs}>
								<input
									placeholder='Ваш никнейм'
									type='text'
									value={value}
									onChange={(e) => setValue(e.target.value)}
									className={styles.input_main}
								/>
								<div className={styles.profile_link}>
									<div className={classnames(styles.input, styles.link)}>https://darkforum/profile</div>
									<div className={styles.input}>{value}</div>
								</div>
							</div>
							<div className={styles.requirements}>
								<div className={styles.requirements_username}>Имя пользователя</div>
								<div className={styles.requirements_content}>
									<p className={styles.requirements_content_item}>Здесь вы сможете поменять ваше имя пользователя </p>
									<p>Требования:</p>
									<p> 1. Длина от 3 до 16 символов </p>
									<p> 2. Разрешенные символы: a-z A-Z 0-9 - _ </p>
									<p> 3. Ваш никнейм не должен нарушать правила форму</p>
								</div>
							</div>
						</div>

						<hr className={styles.hr} />

						<div className={styles.middle}>
							<div className={styles.change_photo}>
								{userImage ? (
									<img
										src={userImage}
										alt=''
										className={styles.user_img}
									/>
								) : (
									<div
										className={classnames(styles.user_img, styles.noImg)}
										style={{ backgroundColor: avatarColor }}
									>
										{userLogin.slice(0, 1).toUpperCase()}
									</div>
								)}

								<div className={styles.change_place}>
									<span className={styles.change_place_ico}>
										<TbCameraPlus />
									</span>
									Переместить фотографию
								</div>
							</div>
							<div className={styles.middle_about}>
								<p className={styles.requirements_username}>Аватарка пользователя</p>
								<p className={styles.requirements_content}>Обновите свою фотографию</p>
							</div>
						</div>
						<div className={styles.buttons}>
							<button
								type='button'
								className={styles.buttons_item}
							>
								Отмена
							</button>
							<button
								type='button'
								className={classnames(styles.buttons_item, styles.save)}
							>
								Сохранить
							</button>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</>
	)
}
