import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  setCurrentChat,
  fetchMessages,
  selectSortedThreads,
} from 'utils/redux/slices/chatSlice'
import { ConversationThumbnail } from '../ConversationThumbnail/ConversationThumbnail'
import { EmptyChatPage } from '../ChatRoom/EmptyChatPage'
import { ChatInterface } from 'interfaces/ChatInterface'
import { useSocketEvents } from 'components/Notifications/Socket'
import './ChatsList.scss'

export const ChatsList = ({ handleConversationClick }) => {
  useSocketEvents(false)
  const dispatch = useAppDispatch()
  const [selectChatId, setSelectChatId] = useState('')
  const threads = useAppSelector(selectSortedThreads)

  useEffect(() => {
    if (selectChatId) {
      const selectedThread = threads.find(thread => thread._id === selectChatId)
      dispatch(setCurrentChat(selectedThread))
      handleConversationClick()
    }
  }, [threads, selectChatId])

  const handleSelectChat = async (chatId: string, chatType) => {
    try {
      await dispatch(fetchMessages({ chatId: chatId, chatType: chatType }))
      setSelectChatId(chatId)
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
          isTeamChat,
          participants,
          chatType,
          groupName,
          groupPhoto,
        } = thread
        return (
          <div
            className='conversation-thumbnail'
            key={chatId}
            onClick={() => handleSelectChat(chatId, chatType)}
          >
            <ConversationThumbnail
              groupPhoto={groupPhoto}
              groupName={groupName}
              participants={participants}
              lastMessage={lastMessage}
              chatType={chatType}
              isTeamChat={isTeamChat}
            />
          </div>
        )
      })}
    </div>
  )
}
