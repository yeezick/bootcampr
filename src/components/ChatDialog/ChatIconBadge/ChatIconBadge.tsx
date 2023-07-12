import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useSocket } from 'components/Notifications/Socket'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { getAllConversations } from 'utils/api/chat'
import {
  selectConversation,
  setUnreadMessages,
} from 'utils/redux/slices/chatSlice'
import './ChatIconBadge.scss'

export const ChatIconBadge = ({
  isChatBadgeUpdated,
  setIsChatBadgeUpdated,
}) => {
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { unreadMessages } = useAppSelector(selectConversation)
  const [receivedMessages, setReceivedMessages] = useState({})
  const [badgeUpdateMessage, setBadgeUpdateMessage] = useState('')

  useEffect(() => {
    if (socket) {
      socket.on('message-from-server', data => {
        setReceivedMessages(data)
      })

      socket.on('read-message-check', data => {
        setBadgeUpdateMessage(data)
        setIsChatBadgeUpdated(true)
      })

      socket.on('unread-messages-checked', data => {
        setBadgeUpdateMessage(data)
        setIsChatBadgeUpdated(true)
      })
    }
  }, [socket, setIsChatBadgeUpdated])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await getAllConversations(authUser._id)
        let unreadCount = 0

        if (res) {
          res.forEach(conversation => {
            if (
              conversation.lastMessage &&
              !conversation.lastMessage.readBy.some(
                participant => participant.user === authUser._id
              )
            ) {
              unreadCount++
            }
          })

          dispatch(setUnreadMessages(unreadCount))
          setIsChatBadgeUpdated(true)
        }
      } catch (error) {
        console.error('Error fetching chats', error)
      }
    }
    getConversations()
  }, [
    receivedMessages,
    badgeUpdateMessage,
    setIsChatBadgeUpdated,
    isChatBadgeUpdated,
  ])

  // ClassName for badge: if unreadMessages === 0, icon will be hidden
  const badgeClassName = unreadMessages === 0 ? 'hidden' : 'visible'

  return (
    <div className={`messages-badge ${badgeClassName}`}>
      <p>{unreadMessages}</p>
    </div>
  )
}
