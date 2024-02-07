import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectChat,
  updateCurrentChatMessages,
  setMessageUnread,
  setMessageRead,
  processChatRoom,
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

  const createNewRoom = chatRoomInfo => {
    socket.emit('create-new-room', chatRoomInfo)
  }

  useEffect(() => {
    socket.emit('setUserId', authUser._id)

    if (currentConversation._id) {
      socket.emit('join-conversation', {
        chatRoomId: currentConversation._id,
        activeUserId: authUser._id,
      })
    }

    socket.on('new-room-created', chatRoom => {
      dispatch(processChatRoom(chatRoom))
    })

    socket.on('message-read', ({ chatRoomId, activeUserId }) => {
      dispatch(setMessageRead({ chatRoomId, activeUserId }))
    })

    socket.on('new-message-received', receivedMessage => {
      if (!isChatRoomActive) {
        dispatch(
          updateCurrentChatMessages({
            receivedMessage,
            activeUserId: authUser._id,
          })
        )
        dispatch(
          setMessageUnread({
            chatRoomId: receivedMessage.chatRoomId,
            senderId: receivedMessage.senderId,
          })
        )
      }
    })

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

      //when we enter a new chat room with unread message
      if (currentConversation._id) {
        socket.emit('mark-message-as-read', {
          chatRoomId: currentConversation._id,
          chatType: currentConversation.chatType,
          activeUserId: authUser._id,
        })
      }
    }

    return () => {
      if (listenForChatEvents) {
        socket.off('message-from-server')
      }
      socket.off('message-read')
      socket.off('new-room-created')
      socket.off('new-message-received')
    }
  }, [
    currentConversation._id,
    authUser._id,
    listenForChatEvents,
    dispatch,
    isChatRoomActive,
  ])
  return { sendMessage, createNewRoom }
}
