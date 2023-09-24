import { AllTickets } from 'components/Kanban'
import { ProjectInterface } from 'interfaces'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOneProject, getOneUser, verifyTokenExpiration } from 'utils/api'
import { Checkbox } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import { toggleChatOpen } from 'utils/redux/slices/chatSlice'
import './Project.scss'
import { useSelector } from 'react-redux'
import { selectProject } from 'utils/redux/slices/projectSlice'

export const TaskBoard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('unread')
  const queryUserId = queryParams.get('user')
  const [emailLinkClicked, setEmailLinkClicked] = useState(false)
  const { id } = useParams()
  const project = useSelector(selectProject)
  const [projectDetail, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

  // TODO: Following logic to verify user and determine routing should be done at a layout/auth layer, not the responsibility of the rendered component
  // Jira: BC-619
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

  useEffect(() => {
    setProjectDetails(project)
  }, [id])

  return (
    <div className='Project'>
      <div>
        <div className='Project-header'>
          <h1>Kanban board</h1>
        </div>
        <div className='Project-filter'>
          <span>
            <Checkbox />
            <p>All Task</p>
          </span>
          <span>
            <Checkbox />
            <p>My Task</p>
          </span>
        </div>
      </div>
      <div>
        {projectDetail && <AllTickets projectTracker={projectDetail} />}
      </div>
    </div>
  )
}
