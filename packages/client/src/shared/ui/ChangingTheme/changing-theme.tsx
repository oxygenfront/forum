import { useChoosingThemeQuery } from '@/shared/ui/ChoosingTheme/api/choosingThemeApi'
import { type ChangeEvent, FC, Fragment, useState } from 'react'
import styles from './changingTheme.module.sass'

export const ChangingTheme: FC = () => {
	const { data } = useChoosingThemeQuery()
	// Создаём состояние для хранения значений инпутов
	const [inputValues, setInputValues] = useState<string[]>(
		data ? data.map((el) => el.latestMessage?.theme.themeTitle) : [],
	)

	// Обработчик изменения значения в инпуте
	const handleInputChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
		const updatedValues = [...inputValues]
		updatedValues[index] = event.target.value
		setInputValues(updatedValues) // Обновляем состояние с новым значением
	}

	return (
		<div className={styles.changing}>
			<div className={styles.changing_wrapper}>
				<div className={styles.changing_first}>
					{data !== undefined
						? data.map((el, index) => (
								<Fragment key={JSON.stringify(el)}>
									<input
										className={styles.changing_input}
										type={'text'}
										value={inputValues[index]} // Отображаем значение из состояния
										onChange={handleInputChange(index)} // Обработчик изменения
									/>
									<button
										type={'button'}
										className={styles.changing_btn}
									>
										Сохранить
									</button>
								</Fragment>
							))
						: ''}
				</div>
				{/*<div className={styles.changing_first}>*/}
				{/*	<input*/}
				{/*		placeholder='Измените содержимое темы'*/}
				{/*		className={styles.changing_input}*/}
				{/*		value={inputValues[inputValues.length]} // Для добавления нового инпута*/}
				{/*		onChange={(e) => {*/}
				{/*			const newInputValues = [...inputValues, e.target.value]*/}
				{/*			setInputValues(newInputValues)*/}
				{/*		}}*/}
				{/*	/>*/}
				{/*	<button*/}
				{/*		type={'button'}*/}
				{/*		className={styles.changing_btn}*/}
				{/*	>*/}
				{/*		Сохранить*/}
				{/*	</button>*/}
				{/*</div>*/}
			</div>
		</div>
	)
}
