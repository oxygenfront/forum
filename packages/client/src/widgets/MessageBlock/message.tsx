import { Action } from '@/features/Action'
import { selectIsLogin, selectUserData } from '@/features/Auth'
import { setValue, useDeleteMessageMutation } from '@/features/CreateMessage'
import { ModalOptions } from '@/features/ModalSort'
import { timeSincePublication } from '@/shared/lib'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import type { IMessageRes } from '@/shared/types'
import { RepliedMessage, setReplyMessageId } from '@/shared/ui/ReplyedMessage'
import classNames from 'classnames'
import type { FC } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { FaArrowTurnDown } from 'react-icons/fa6'
import styles from './message.module.sass'

interface IMessageProps extends IMessageRes {
    userThemeId: string
    isChat?: boolean
}

export const Message: FC<IMessageProps> = ( message ) => {
    const {
        content,
        user,
        userId: messageUserId,
        id: messageId,
        themeId,
        respondedTo,
        isChat,
        createdAt
    } = message
    const { id: userId } = useAppSelector(selectUserData)
    const isLogin = useAppSelector(selectIsLogin)
    const dispatch = useAppDispatch()

    const [ deleteMessage ] = useDeleteMessageMutation()

    const handleDeleteMessage = () => {
        deleteMessage(messageId)
    }

    const handleUpdateMessage = () => {
        dispatch(setValue({
            content,
            themeId,
            userId: message.userId,
            messageId: messageId,
            isEdit: true
        }))
    }

    const handleReplyMessage = () => {
        dispatch(setReplyMessageId(messageId))
    }

    return (
        <div className={styles.container}>
            {message.user.id === userId && isLogin && (
                <ModalOptions
                    arrayActions={[
                        <Action
                            nameAction='Редактировать'
                            action={handleUpdateMessage}
                            key={`edit-${messageId}`}
                        />,
                        <Action
                            nameAction='Удалить'
                            action={handleDeleteMessage}
                            key={`delete-${messageId}`}
                        />,
                    ]}
                />
            )}
            {respondedTo.length
                ? respondedTo.map(( responded ) => (
                    <RepliedMessage
                        key={responded.id}
                        {...responded}
                    />
                ))
                : null}
            <div className={styles.user_wrapper}>
                <div className={styles.user}>
                    {user.userImage ? (
                        <img
                            src={user.userImage}
                            alt='Аватар'
                            className={styles.user_img}
                        />
                    ) : (
                        <div
                            style={{ backgroundColor: message.user.avatarColor }}
                            className={classNames(styles.user_img, styles.noImg)}
                        >
                            {message.user.userLogin[0].toUpperCase()}
                        </div>
                    )}

                    <div className={styles.user_name}>{user.userLogin}</div>
                    <div
                        className={styles.user_role}>{message.userThemeId === messageUserId ? 'Продавец' : 'Пользователь'}</div>
                </div>
                <div className={styles.content}>{content}</div>
            </div>
            <hr className={styles.hr}/>
            <div className={styles.down}>
                <div className={styles.icons}>
                    {isChat ? (
                        <span
                            className={styles.created_at}>{timeSincePublication(new Date(createdAt), isChat)}</span>
                    ) : (
                        <>
                            <button
                                type='button'
                                className={styles.wrapper_icon}
                            >
                                <AiOutlineLike/>
                                <span>103</span>
                            </button>
                            <button
                                type='button'
                                className={styles.wrapper_icon}
                            >
                                <AiOutlineDislike/>
                                <span>103</span>
                            </button>
                        </>
                    )}
                </div>
                <button
                    type='button'
                    className={styles.button}
                    disabled={!isLogin}
                    onClick={handleReplyMessage}
                >
                    <FaArrowTurnDown/>
                    <span className={styles.btnText}>Ответить</span>
                </button>
            </div>
        </div>
    )
}