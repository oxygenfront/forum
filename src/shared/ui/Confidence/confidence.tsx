import styles from './confidence.module.sass'
export const Confidence = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.up}>
					<input
						placeholder=''
						type='text'
						className={styles.input}
					/>
					<div className={styles.up_about}>
						<p className={styles.up_about_title}>Почта</p>
						<p className={styles.up_about_desc}>Текущая электронная почта</p>
					</div>
				</div>
				<div className={styles.middle}>
					<div className={styles.up}>
						<input
							placeholder=''
							type='text'
							className={styles.input}
						/>
						<div className={styles.up_about}>
							<p className={styles.up_about_title}>Смена текущей почты</p>
							<p className={styles.up_about_desc}>
								Введите адрес новой почты для смены текущей <p>почты</p>
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
		</>
	)
}
