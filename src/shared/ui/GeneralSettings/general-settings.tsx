import styles from './general-settings.module.sass'
export const GeneralSettings = () => {
	return (
		<>
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
								htmlFor={'lock-wall'}
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
								htmlFor={'lock-wall'}
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
		</>
	)
}
