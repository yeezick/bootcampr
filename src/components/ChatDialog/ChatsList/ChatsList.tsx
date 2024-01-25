import { useEffect, useState } from 'react'
import { useSocket } from 'components/Notifications/Socket'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  setCurrentChat,
  updateCurrentChatMessages,
} from 'utils/redux/slices/chatSlice'
import {
  getAllPrivateMessages,
  getGroupChatMessages,
  getUserChatThreads,
} from 'utils/api/chat'
import { ConversationThumbnail } from './ConversationThumbnail'
import { Thread } from 'interfaces/ChatInterface'
import { EmptyChatPage } from '../ChatRoom/EmptyChatPage'
import './ChatsList.scss'

export const ChatsList = ({ handleConversationClick }) => {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [threads, setThreads] = useState([])

  useEffect(() => {
    if (socket) {
      //Todo - check if this necessary maybe we can solve with redux
      // socket.on('message-from-server', newMessage => {
      //   dispatch(updateCurrentChatMessages(newMessage))
      // })
      socket.emit('check-any-unread-messages', {
        authUser: authUser._id,
      })
    }
  }, [socket, authUser._id])

  useEffect(() => {
    const handleThreads = async () => {
      const chatThreads = await getUserChatThreads()
      console.log(chatThreads)
      setThreads(chatThreads)
    }
    handleThreads()
  }, [])

  const handleSelectChat = async (chatId: string, chatType) => {
    try {
      if (chatType === 'group') {
        const groupChatMessages = await getGroupChatMessages(chatId)
        dispatch(setCurrentChat(groupChatMessages))
      } else {
        const privateChatMessages = await getAllPrivateMessages(chatId)
        dispatch(setCurrentChat(privateChatMessages))
      }
      handleConversationClick()
    } catch (error) {
      console.log(error)
    }
  }

  if (threads.length === 0) {
    return (
      <EmptyChatPage
        screen='NoConversations'
        className='no-result'
        text="Don't be shy! Start a conversation"
      />
    )
  }

  return (
    <div className='conversations-container'>
      {threads.map((thread: Thread) => {
        const {
          _id: chatId,
          // lastMessage,
          lastActive,
          participants,
          chatType,
          groupName,
        } = thread
        return (
          <div
            className='conversation-grid'
            key={chatId}
            onClick={() => handleSelectChat(chatId, chatType)}
          >
            <ConversationThumbnail
              authUser={authUser}
              groupName={groupName}
              participants={participants}
              // lastMessage={lastMessage}
              lastActive={lastActive}
            />
          </div>
        )
      })}
    </div>
  )
}
