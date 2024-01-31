import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectChat,
  setUnreadChatsCount,
  updateCurrentChatMessages,
} from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`
const socket = io(ENDPOINT) // Replace with your server URL

//Old code, keeping it for testing if we have any issues
// export const useSocket = () => {
//   const [socket, setSocket] = useState<SocketIOClient | null>(null)

//   useEffect(() => {
//     // Todo: this breaks jest test, is it necessary at all?
//     // todo: may potentially be obsolete once we move away from chrome alerts
//     // const askUserPermission = async () => {
//     //   return await Notification.requestPermission()
//     // }
//     // askUserPermission()

//     setSocket(io(ENDPOINT, { transports: ['websocket'] }))
//   }, [])

//   return socket
// }

export const useSocket = userId => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Initialize the Socket.IO client
    const newSocket = io(ENDPOINT, {
      query: { userId },
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [userId])

  return socket
}

export const useSocketEvents = (listenForChatEvents = false) => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const isChatRoomActive = useAppSelector(
    state => state.chatbox.isChatRoomActive
  )
  console.log('socketcalled')
  // For initial socket setup
  useEffect(() => {
    if (!socket) return

    socket.emit('setUserId', authUser._id)
    socket.on('connect', () => {})

    socket.on('disconnect', () => {
      console.log('User has disconnected')
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const sendMessage = message => {
    if (currentConversation._id) {
      socket.emit('send-message', message)
    }
  }

  useEffect(() => {
    console.log('socketcalledineffect')
    socket.emit('setUserId', authUser._id)
    if (currentConversation._id) {
      socket.emit('join-conversation', {
        chatRoomId: currentConversation._id,
        activeUserId: authUser._id,
      })
    }
    socket.on('update-unread-count', unreadCount => {
      console.log('unread', unreadCount)
      dispatch(setUnreadChatsCount(unreadCount))
    })
    // socket.on('notificationsLength', data => {
    //   setNotificationCount(data)
    // })
    //for the chat room events
    if (listenForChatEvents) {
      socket.on('message-from-server', receivedMessage => {
        if (receivedMessage.chatRoomId === currentConversation._id) {
          console.log('new message received room', receivedMessage)
          dispatch(
            updateCurrentChatMessages({
              receivedMessage,
              activeUserId: authUser._id,
            })
          )
          if (isChatRoomActive) {
            socket.emit('mark-message-as-read', {
              chatRoomId: currentConversation._id,
              chatType: currentConversation.chatType,
              activeUserId: authUser._id,
            })
          }
        }
      })
      socket.emit('mark-message-as-read', {
        chatRoomId: currentConversation._id,
        chatType: currentConversation.chatType,
        activeUserId: authUser._id,
      })
    }

    return () => {
      if (listenForChatEvents) {
        socket.off('message-from-server')
      }
      socket.off('update-unread-count')
    }
  }, [
    currentConversation._id,
    authUser._id,
    listenForChatEvents,
    dispatch,
    isChatRoomActive,
  ])
  return { sendMessage }
}
