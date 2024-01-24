import { useEffect, useState } from 'react'
import { useSocket } from 'components/Notifications/Socket'

import { getUserConversations } from 'utils/api/chat'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  updateUnreadMessagesObj,
} from 'utils/redux/slices/userSlice'
import {
  selectConversation,
  setCurrentConversation,
  setSelectedMember,
} from 'utils/redux/slices/chatSlice'
import './Conversations.scss'
import { markConversationAsRead } from 'utils/api'
import { ConversationsScreen } from './ConversationsScreen'

export const Conversations = ({ handleConversationClick }) => {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const currentConversation = useAppSelector(selectConversation)
  const [threads, setThreads] = useState([])
  const [chatsListStatus, setChatsListStatus] = useState('empty')

  const [newMessage, setNewMessage] = useState('')
  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', data => {
        setNewMessage(data.newMessage)
      })
      socket.emit('check-any-unread-messages', {
        authUser: authUser._id,
      })
    }
  }, [socket, authUser._id])

  useEffect(() => {
    const getThreads = async () => {
      try {
        //this gets a summary of the thread.
        const res = await getUserConversations(authUser._id)
        if (res) {
          setThreads(res)
          res.length > 0
            ? setChatsListStatus('conversations')
            : setChatsListStatus('noConversations')
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
    getThreads()
  }, [authUser._id, newMessage])

  const handleConvoClick = async (
    chatId: string,
    participants: any,
    groupName: string
  ) => {
    if (participants.length > 2) {
      dispatch(
        setCurrentConversation({
          _id: chatId,
          isGroup: true,
          participants,
          displayName: groupName,
        })
      )
      const readMessageRes = await markConversationAsRead(authUser._id, chatId)
      dispatch(updateUnreadMessagesObj(readMessageRes.unreadMessages))
    } else {
      const recipient = participants.filter(
        participant => participant._id !== authUser._id
      )

      dispatch(
        setCurrentConversation({
          _id: chatId,
          isGroup: false,
          participants,
          displayName: `${recipient[0].firstName} ${recipient[0].lastName}`,
        })
      )
      dispatch(
        setSelectedMember({
          _id: recipient[0]._id,
          firstName: recipient[0].firstName,
          lastName: recipient[0].lastName,
          profilePicture: recipient[0].profilePicture,
        })
      )
      const readMessageRes = await markConversationAsRead(authUser._id, chatId)
      dispatch(updateUnreadMessagesObj(readMessageRes.unreadMessages))
    }

    // Socket.IO Emit event: sends conversation room to join to socket server
    socket.emit('join-conversation', {
      authUser: authUser._id,
      chatRoom: currentConversation._id,
    })
    // Checks for unread message when a conversation is opened
    socket.emit('read-message', {
      authUser: authUser._id,
      chatRoom: currentConversation._id,
    })
    await handleConversationClick()
  }

  return (
    <div className='conversations-container'>
      <ConversationsScreen
        authUser={authUser}
        chatsListStatus={chatsListStatus}
        threads={threads}
        handleConvoClick={handleConvoClick}
      />
    </div>
  )
}
