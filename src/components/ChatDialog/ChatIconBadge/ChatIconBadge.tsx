import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { getAllConversations } from 'utils/api/chat'
import {
  selectConversation,
  setUnreadMessages,
} from 'utils/redux/slices/chatSlice'
import './ChatIconBadge.scss'

export const ChatIconBadge = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const { unreadMessages } = useAppSelector(selectConversation)

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
        }
      } catch (error) {
        console.error('Error fetching chats', error)
      }
    }
    getConversations()
  }, [])

  return (
    <div className='messages-badge'>
      <p>{unreadMessages}</p>
    </div>
  )
}
