import type { IChat } from '@/shared/types'
import type { FC } from 'react'
import { CiChat1 } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import styles from './chat-link.module.sass'

type IChatLinkProps = Pick<IChat, 'id' | 'title' | 'usersCount' | 'messagesCount'>

export const ChatLink: FC<IChatLinkProps> = ( {
                                                  messagesCount,
                                                  usersCount,
                                                  title,
                                                  id
                                              } ) => {
    return (
        <Link
            to={`${id}`}
            className={styles.chat__item}
        >
            <div className={styles.chat__item_left}>
                <CiChat1/>
                <span>{title}</span>
            </div>
            <div className={styles.chat__item_center}>
				<span>
					Сообщений <span
                    className={styles.chat__item_count}>{messagesCount}</span>
				</span>
                <span className={styles.hr}/>
                <span>
					Пользователей <span
                    className={styles.chat__item_count}>{usersCount}</span>
				</span>
            </div>
            <div className={styles.chat__item_right}>
                <div>Нет сообщений</div>
            </div>
        </Link>
    )
}