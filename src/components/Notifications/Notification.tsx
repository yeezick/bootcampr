import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { selectSortedThreads } from 'utils/redux/slices/chatSlice'
import { chatNotification } from './ChatNotification'

export const Notification = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const navigate = useNavigate()
  const path = useLocation()
  const queryParams = new URLSearchParams(path.search)
  const notificationPage = queryParams.get('type')
  const threads = useAppSelector(selectSortedThreads)

  useEffect(() => {
    if (authUser?._id && notificationPage === 'chat' && threads.length > 0) {
      const chatRoomId = queryParams.get('chatRoomId')
      chatNotification(threads, authUser, chatRoomId, dispatch, navigate)
    }
  }, [authUser?._id, notificationPage, dispatch, navigate, threads])

  return null
}
