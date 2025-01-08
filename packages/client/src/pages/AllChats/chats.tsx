import { selectUserData } from '@/features/Auth'
import { useAppSelector } from '@/shared/lib/hooks'
import type { IChat } from '@/shared/types'
import { BlockContainer, Loader } from '@/shared/ui'
import { ChatLink } from '@/widgets/ChatLink'
import { type FC, Fragment, useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import styles from './chats.module.sass'

export const AllChatsPages: FC = () => {
    const { id } = useAppSelector(selectUserData)
    const [ chats, setChats ] = useState<IChat[]>([])
    const [ socket, setSocket ] = useState<Socket | null>(null)

    useEffect(() => {
        if ( !id ) {
            return
        }

        // Подключение к сокету
        const socketConnection = io('http://localhost:8080', {
            transports: [ 'websocket' ],
            query: { userId: id },
        })

        setSocket(socketConnection)

        socketConnection.on('updateChat', ( updatedChat: IChat[] ) => {
            setChats(updatedChat)
        })

        return () => {
            socketConnection.disconnect()
            setSocket(null)
        }
    }, [ id ])

    if ( !socket ) {
        return <Loader/>
    }
    return (
        <>
            {chats?.length ? (
                <BlockContainer title='Мои чаты'>
                    {chats.map(( el, i ) => (
                        <Fragment key={el.id}>
                            <ChatLink
                                id={el.id}
                                usersCount={el.usersCount}
                                title={el.title}
                                messagesCount={el.messagesCount}
                            />
                            {i !== chats.length - 1 &&
                                <hr className={styles.hr}/>}
                        </Fragment>
                    ))}
                </BlockContainer>
            ) : (
                'У вас нет активных чатов, желаете создать ?'
            )}
        </>
    )
}