import styles from './appearance.module.sass'
export const Appearance = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.up}>
					<div className={styles.inputs}>
						<input
							placeholder=''
							type='text'
							className={styles.input_main}
						/>
						<div className={styles.input_username}>
							<input
								placeholder=''
								type='text'
								className={styles.input}
							/>
							<input
								placeholder=''
								type='text'
								className={styles.input}
							/>
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
				<div className={styles.middle}>
					<div className={styles.change_photo}>
						<img
							src='https://img.freepik.com/free-vector/girl-with-red-eyes_603843-3008.jpg'
							alt=''
							className={styles.image}
						/>
						<div className={styles.change_place}>Переместить фотографию</div>
					</div>
					<div className={styles.middle_about}>
						<p className={styles.requirements_username}>Аватарка пользователя</p>
						<p className={styles.requirements_content}>Обновите свою фотографию</p>
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
