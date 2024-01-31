import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import {
  setCurrentChat,
  updateCurrentChatMessages,
  selectThreads,
  fetchMessages,
  fetchThreads,
} from 'utils/redux/slices/chatSlice'
import { ConversationThumbnail } from './ConversationThumbnail'
import { EmptyChatPage } from '../ChatRoom/EmptyChatPage'
import './ChatsList.scss'
import { ChatInterface } from 'interfaces/ChatInterface'
import { useSocket, useSocketEvents } from 'components/Notifications/Socket'

export const ChatsList = ({ handleConversationClick }) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  useSocketEvents(false)
  const threads = useAppSelector(selectThreads)
  // useSocketEvents(true)
  useEffect(() => {
    dispatch(fetchThreads())
  }, [dispatch])

  const handleSelectChat = async (chatId: string, chatType) => {
    try {
      dispatch(fetchMessages({ chatId: chatId, chatType: chatType }))
      dispatch(setCurrentChat({ chatId: chatId }))
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
      {threads.map((thread: ChatInterface) => {
        const {
          _id: chatId,
          lastMessage,
          lastActive,
          participants,
          chatType,
          groupName,
        } = thread
        return (
          <div
            className='conversation-thumbnail'
            key={chatId}
            onClick={() => handleSelectChat(chatId, chatType)}
          >
            <ConversationThumbnail
              groupName={groupName}
              participants={participants}
              lastMessage={lastMessage}
              chatType={chatType}
              lastActive={lastActive}
            />
          </div>
        )
      })}
    </div>
  )
}
