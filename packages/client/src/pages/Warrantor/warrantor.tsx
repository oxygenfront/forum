import { BlockThemeContainer } from '@/shared/ui'
import type { FC } from 'react'

export const WarrantorPage: FC = () => {
	return (
		<>
			{/* <div className={styles.container}>
				<Title>Гарант</Title>
				<hr className={styles.hr} />
				<div className={styles.content}>
					<div className={styles.body}>
						Сервис гаранта обеспечивает безопасность средств и сделок на форуме и гарантирует надежность
						платформы.
						<br />
						Все продавцы прошли реальный контроль качества и соответствия своих услуг.
						<span className={styles.important}> Мы настоятельно рекомендуем </span>
						воспользоваться этим сервисом, если вы впервые собираетесь приобретать товары или услуги на
						нашей платформе.
						<br />
						<br />
						Мы подготовили простое руководство для пользователей, которые хотят совершить свою первую сделку
						на платформе:
						<ol className={styles.list}>
							<strong>
								<li className={styles.list_item}>
									Продавец и покупатель договариваются о сделке, используя контактные данные,
									указанные в предложении.
								</li>
								<li className={styles.list_item}>
									Если Покупатель выбрал вариант Гаранта, то продавец создает чат, включающий в себя
									Гаранта, Продавца и Покупателя.
								</li>
								<li className={styles.list_item}>
									Покупатель переводит деньги на реквизиты Гаранта, при условии выбора данного метода
									проведения сделки, иначе напрямую на реквизиты указанные Продавцом.
								</li>
								<li className={styles.list_item}>
									Передача товара покупателю или оказание услуг Покупателю.
								</li>
								<li className={styles.list_item}>
									Проверка и подтверждение товара или оказании услуги.
								</li>
								<li className={styles.list_item}>
									Покупатель одобряет товар/услугу и сообщает об этом Гаранту, при условии выбора
									данного метода проведения сделки или же подтверждает исполнение сделки
									непосредственно Продавцу
								</li>
							</strong>
						</ol>
						<br />
						<strong className={styles.important}>Комиссия</strong> за гарантийное обслуживание = 5% от суммы
						сделки
						<br />
						Пожалуйста, воспользуйтесь приведенной <strong className={styles.important}>ниже формой</strong>
						, чтобы сделать перевод в Гарантийную службу:
						<ol className={styles.list}>
							<strong>
								<li className={styles.list_item}>Никнеймы участников сделки</li>
								<li className={styles.list_item}>Предмет сделки</li>
								<li className={styles.list_item}>Сумма сделки</li>
								<li className={styles.list_item}>Условия для успешного завершения сделки</li>
								<li className={styles.list_item}>Сроки сделки</li>
							</strong>
						</ol>
						<br />
						<strong>Пример:</strong>
						<br />
						<ol className={styles.list}>
							<strong>
								<li className={styles.list_item}>Покупатель я(ник), Продавец (ник)</li>
								<li className={styles.list_item}>Покупаю товар техника за полцены</li>
								<li className={styles.list_item}>1000$</li>
								<li className={styles.list_item}>
									Продавец получает деньги из гаранта, только после того как я получу продукт и буду
									убеждён в его работоспособности.
								</li>
								<li className={styles.list_item}>В течение 1-2 недель.</li>
							</strong>
						</ol>
						<br />
						После этого продавец должен зайти в чат, ознакомиться с описанными условиями и подтвердить их.
						После этого сделка считается заключённой. Далее Вы получите реквизиты для перевода средств. Для
						того, чтобы написать мне нажмите на мою аватарку и кликните "начать переписку".
						<br />
						<br />
						<strong>
							* Если Продавец не выполнит свои обязательства, будет инициирована проверка темы Продавца и
							непосредственного Продавца, а также последует запуск процесса по возврату денежных средств
							Покупателю.
							<br />* В случае мошенничества со стороны Продавца, Покупатель получит компенсацию в размере
							<span className={styles.important}> двукратной</span> стоимости покупки в качестве моральной
							компенсации.
							<br />* В случае попытки мошенничества со стороны Пользователя, доступ к ресурсу будет может
							быть
							<span className={styles.important}> навсегда закрыт.</span>
							<br />* В случае если товар окажется ненадлежащего качества (бракованным), Гарант имеет
							право обязать Продавца заменить товар, не перечисляя Продавцу денег или закрыть сделку в
							пользу Покупателя с возвратом денежных средств.
						</strong>
						<br />
						<br />
						Также, если вы уже опытный пользователь и совершили множество сделок, вы можете сделать заказ
						напрямую у продавца, при условии, что контактные данные указаны в заявленном предложении. Удачи
						вам и успехов, а мы приветствуем вас на DarkForum.
					</div>
				</div>
				<hr className={styles.hr} />
				<div className={styles.bottom}>
					<div className={styles.user}>
						<img src='images/avatar.png' alt='Аватар' className={styles.avatar} />
						<div className={styles.user_info}>
							<div className={styles.user_up}>
								<span className={styles.user_name}>Гарант</span>
								<div className={styles.user_dot} />
								<span className={styles.user_role}>Администратор</span>
							</div>
							<div className={styles.user_bottom}>
								<span>Сообщений: 2000</span>
								<span className={styles.user_date}>Март 7, 2001</span>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			<BlockThemeContainer
				title='Гарант сервис'
				user={{ userLogin: 'Гарант', userImage: '', avatarColor: '' }}
				createdAt={new Date('2024-11-26T21:02:40.561Z')}
				views={1003}
				countMessages={103}
				flag={true}
			/>
		</>
	)
}
