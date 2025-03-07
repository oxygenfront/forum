import { timeSincePublication, trimmingText } from '@/shared/lib'
import type { IUserLessData } from '@/shared/types'
import styles from '@/shared/ui/ChapterLink/chapter-link.module.sass'
import { RenderAvatar } from '@/shared/ui/RenderAvatar'

interface LatestMessageProps {
	userImage?: string | null
	userLogin?: string
	createdAt?: Date
	content?: string
	user: IUserLessData
}
interface RenderLatestMessageProps {
	latest: LatestMessageProps | undefined
}

export function RenderLatestMessage({ latest }: RenderLatestMessageProps) {
	if (!latest) {
		return (
			<span
				style={{
					width: '220px',
					fontSize: '20px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				Нет сообщений
			</span>
		)
	}

	const { createdAt, content, user } = latest

	return (
		<div className={styles.user}>
			<RenderAvatar user={user} />
			<div className={styles.user__wrapper}>
				<p className={styles.user_message}>{trimmingText(content ?? '', 50)}</p>
				<div className={styles.user__info}>
					<div className={styles.user__info_name}>{trimmingText(user.userLogin ?? 'Аноним', 10)}</div>
					<div className={styles.user__info_time}>
						{createdAt ? timeSincePublication(new Date(createdAt)) : 'Неизвестно'}
					</div>
				</div>
			</div>
		</div>
	)
}
