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
import {
  selectUserExperience,
  selectUserId,
} from 'utils/redux/slices/userSlice'
import { isSandboxId, isWaitlistExperience } from 'utils/helpers/taskHelpers'
import { handleJoinDiscord, handleJoinTeam } from 'utils/helpers/paymentHelpers'
import { useNavigate } from 'react-router-dom'
import { closeChatBox } from 'utils/helpers/chatHelpers'

export const ChatsList = ({ handleConversationClick }) => {
  useSocketEvents(false)
  const userExperience = useAppSelector(selectUserExperience)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const [selectChatId, setSelectChatId] = useState('')
  const threads = useAppSelector(selectSortedThreads)
  const navigate = useNavigate()

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

  if (isSandboxId(userExperience)) {
    const handleJoinTeamBtn = () => {
      closeChatBox(dispatch)
      handleJoinTeam(dispatch, navigate, userId)
    }
    return (
      <EmptyChatPage
        screen='NoConversations'
        className='no-result'
        text='Join a team to chat with!'
        handler={{ text: 'Join a team', function: handleJoinTeamBtn }}
      />
    )
  } else if (isWaitlistExperience(userExperience)) {
    return (
      <EmptyChatPage
        screen='NoConversations'
        className='no-result'
        text='Join the Bootcampr community while you wait to get matched to a team.'
        handler={{
          text: 'Join the Bootcampr community',
          function: handleJoinDiscord,
        }}
      />
    )
  } else if (threads.length === 0) {
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
