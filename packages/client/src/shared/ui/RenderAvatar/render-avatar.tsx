import { type IUserLessData } from '@/shared/types'
import styles from '@/shared/ui/ThemeLink/theme-link.module.sass'
import classNames from 'classnames'

interface IRenderAvatarProps {
	user: IUserLessData
}

export function RenderAvatar({ user }: IRenderAvatarProps) {
	return (
		<>
			{user.userImage ? (
				<img
					src={user.userImage}
					alt=''
					className={styles.user_avatar}
				/>
			) : (
				<span
					className={classNames(styles.user_avatar, styles.noImg)}
					style={{ backgroundColor: user.avatarColor }}
				>
					{user.userLogin[0].toUpperCase()}
				</span>
			)}
		</>
	)
}
