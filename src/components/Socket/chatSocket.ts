import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { api } from 'utils/api'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectChat,
  updateCurrentChatMessages,
  setMessageUnread,
  setMessageRead,
  processChatRoom,
} from 'utils/redux/slices/chatSlice'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
//endpoint has already slash at the end
const ENDPOINT = api.getUri()

export const useChatSocket = userId => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`${ENDPOINT}/chat`, {
      query: { userId },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    })

    newSocket.emit('setUserId', userId)

    newSocket.on('connect', () => {
      newSocket.emit('setUserId', userId)
    })

    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [userId])

  return socket
}

export const useChatSocketEvents = (listenForChatEvents = false) => {
  const dispatch = useAppDispatch()
  const currentConversation = useAppSelector(selectChat)
  const authUser = useAppSelector(selectAuthUser)
  const activeChatRoomId = useAppSelector(
    state => state.chatbox.activeChatRoomId
  )
  const socket = useChatSocket(authUser._id)

  const sendMessage = message => {
    if (currentConversation._id) {
      socket.emit('send-message', message)
    }
  }

  const createNewRoom = chatRoomInfo => {
    socket.emit('create-new-room', chatRoomInfo)
  }

  useEffect(() => {
    if (!socket) return

    if (activeChatRoomId && listenForChatEvents) {
      socket.emit('join-conversation', {
        chatRoomId: activeChatRoomId,
        activeUserId: authUser._id,
      })
    }

    const handleNewRoomCreated = chatRoom => {
      dispatch(processChatRoom(chatRoom))
    }

    const handleMessageRead = ({ chatRoomId, activeUserId }) => {
      dispatch(setMessageRead({ chatRoomId, activeUserId }))
    }

    const handleNewMessageReceived = receivedMessage => {
      if (activeChatRoomId !== receivedMessage.chatRoomId) {
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
    }

    const handleMessageFromServer = receivedMessage => {
      if (receivedMessage.chatRoomId === currentConversation._id) {
        dispatch(
          updateCurrentChatMessages({
            receivedMessage,
            activeUserId: authUser._id,
          })
        )
        if (activeChatRoomId) {
          socket.emit('mark-message-as-read', {
            chatRoomId: currentConversation._id,
            chatType: currentConversation.chatType,
            activeUserId: authUser._id,
          })
        }
      }
    }

    socket.on('new-message-received', handleNewMessageReceived)
    socket.on('message-read', handleMessageRead)
    socket.on('new-room-created', handleNewRoomCreated)
    //for the chat room events
    if (listenForChatEvents) {
      socket.on('message-from-server', handleMessageFromServer)
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
        socket.off('message-from-server', handleMessageFromServer)
      }
      socket.off('new-room-created', handleNewRoomCreated)
      socket.off('message-read', handleMessageRead)
      socket.off('new-message-received', handleNewMessageReceived)
    }
  }, [
    currentConversation._id,
    authUser._id,
    listenForChatEvents,
    dispatch,
    activeChatRoomId,
    socket,
  ])
  return { sendMessage, createNewRoom }
}
