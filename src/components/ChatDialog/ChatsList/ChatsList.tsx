import { useEffect, useState } from 'react'
import { useSocket } from 'components/Notifications/Socket'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectChat,
  setCurrentChat,
  updateCurrentChatMessages,
  selectThreads,
  fetchMessages,
  fetchThreads,
} from 'utils/redux/slices/chatSlice'
import { getUserChatThreads } from 'utils/api/chat'
import { ConversationThumbnail } from './ConversationThumbnail'
import { EmptyChatPage } from '../ChatRoom/EmptyChatPage'
import './ChatsList.scss'
import { ChatInterface } from 'interfaces/ChatInterface'

export const ChatsList = ({ handleConversationClick }) => {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const threads = useAppSelector(selectThreads)

  console.log(threads)
  useEffect(() => {
    if (socket) {
      //Todo - check if this necessary maybe we can solve with redux
      socket.on('message-from-server', newMessage => {
        console.log('new message on lists', newMessage)
        // dispatch(updateCurrentChatMessages(newMessage))
      })
      socket.emit('check-any-unread-messages', {
        authUser: authUser._id,
      })
    }
  }, [socket, authUser._id])

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
        console.log(thread)
        return (
          <div
            className='conversation-grid'
            key={chatId}
            onClick={() => handleSelectChat(chatId, chatType)}
          >
            <ConversationThumbnail
              groupName={groupName}
              participants={participants}
              lastMessage={lastMessage}
              lastActive={lastActive}
            />
          </div>
        )
      })}
    </div>
  )
}
