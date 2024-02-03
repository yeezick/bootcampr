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
const socket = io(ENDPOINT)

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
    socket.emit('setUserId', authUser._id)
    if (currentConversation._id) {
      socket.emit('join-conversation', {
        chatRoomId: currentConversation._id,
        activeUserId: authUser._id,
      })
    }
    socket.on('update-unread-count', unreadCount => {
      dispatch(setUnreadChatsCount(unreadCount))
    })
    if (!isChatRoomActive) {
      socket.on('unread-message', receivedMessage => {
        dispatch(
          updateCurrentChatMessages({
            receivedMessage,
            activeUserId: authUser._id,
          })
        )
      })
    }
    //for the chat room events
    if (listenForChatEvents) {
      socket.on('message-from-server', receivedMessage => {
        if (receivedMessage.chatRoomId === currentConversation._id) {
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
      socket.off('unread-message')
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
