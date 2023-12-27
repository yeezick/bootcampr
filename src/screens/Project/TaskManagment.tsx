import { TaskBoard } from 'components/Kanban'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOneUser, verifyTokenExpiration } from 'utils/api'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { toggleChatOpen } from 'utils/redux/slices/chatSlice'
import { selectProject } from 'utils/redux/slices/projectSlice'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'

export const TaskManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('unread')
  const queryUserId = queryParams.get('user')
  const [emailLinkClicked, setEmailLinkClicked] = useState(false)
  const { id } = useParams()
  const project = useAppSelector(selectProject)

  // BC-654: Token validation and routing should be handled ata higher level like Layout
  useEffect(() => {
    if (queryToken) {
      const validateToken = async () => {
        try {
          const isTokenExpired = await verifyTokenExpiration(queryToken)

          if (isTokenExpired) {
            navigate('/sign-in')
          } else {
            fetchUser()
          }
        } catch (error) {
          console.error('Failed to verify token expiration:', error)
        }
      }
      validateToken()

      const fetchUser = async () => {
        const user = await getOneUser(queryUserId)
        dispatch(updateAuthUser(user))
        localStorage.setItem('bootcamprAuthToken', queryToken)

        navigate(`/project/${user.project}`)
        setEmailLinkClicked(true)
      }
    }

    if (authUser._id && !authUser.project) {
      navigate('/project/unassigned')
    }
  }, [])

  useEffect(() => {
    emailLinkClicked && dispatch(toggleChatOpen())
  }, [authUser.project, emailLinkClicked, dispatch])

  if (project) {
    return <TaskBoard />
  } else {
    // TODO WHAT HAPPENS HERE? CONSOLIDATE FILE?
  }
}
