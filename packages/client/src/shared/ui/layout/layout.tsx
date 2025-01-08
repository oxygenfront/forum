import { selectIsLogin, selectUserData, useGetAuthQuery } from '@/features/Auth'
import { PATH } from '@/shared/constants'
import { useAppSelector } from '@/shared/lib/hooks.ts'
import { Container } from '@/shared/ui'
import { Aside } from '@/widgets/Aside'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { HelloBlock } from '@/widgets/HelloBlock'
import { Main } from '@/widgets/Main'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import styles from './layout.module.sass'

export const Layout: FC = () => {
    const { pathname } = useLocation()
    const { id: chatId } = useParams()
    const [ , setSocket ] = useState<Socket | null>(null)
    const [ , setConnected ] = useState(false)
    const isLogin = useAppSelector(selectIsLogin)
    const navigate = useNavigate()

    const { id: userId } = useAppSelector(selectUserData)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    useGetAuthQuery(undefined, { skip: isLogin })
    const isLoggedUser = isLogin || localStorage.getItem('token') || sessionStorage.getItem('token')

    useEffect(() => {
        if ( userId ) {
            const socketConnection = io('http://localhost:8080', {
                transports: [ 'websocket' ],
                query: { userId },
            })

            socketConnection.on('disconnect', () => {
                setConnected(false)
            })

            if ( pathname.split('/').includes('chats') && chatId ) {
                socketConnection.emit('getChat', { chatId })

                socketConnection.on('chatData', ( chatData ) => {
                    console.log('Chat data:', chatData)
                })
            }

            socketConnection.on('newMessage', ( message ) => {
                if ( message.user.id !== userId ) {
                    enqueueSnackbar(`${message.user.userLogin} написал(а): ${message.content}`, {
                        variant: 'info',
                        action: ( key ) => (
                            <button
                                style={{
                                    padding: '7px',
                                    marginRight: '10px',
                                    backgroundColor: '#003d86',
                                    borderRadius: '5px',
                                }}
                                type='button'
                                onClick={() => {
                                    navigate(`/chats/${message.chatId}`)
                                    closeSnackbar(key)
                                }}
                            >
                                Чат
                            </button>
                        ),
                    })
                }
            })

            setSocket(socketConnection)

            return () => {
                socketConnection.disconnect()
                setSocket(null)
            }
        }
    }, [ userId, enqueueSnackbar ])

    return (
        <>
            <Container>
                <Header/>
                {pathname !== PATH.PROFILE && !isLoggedUser && <HelloBlock/>}
                <main className={styles.main}>
                    <Main/>
                    {pathname !== PATH.ALL_CHATS && <Aside/>}
                </main>
            </Container>
            <Footer/>
        </>
    )
}