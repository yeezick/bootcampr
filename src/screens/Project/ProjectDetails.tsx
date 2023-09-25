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

export const ProjectDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const queryParams = new URLSearchParams(location.search)
  const queryToken = queryParams.get('unread')
  const queryUserId = queryParams.get('user')
  const [allTaskChecked, setAllTaskChecked] = useState(true)
  const [myTaskChecked, setMyTaskChecked] = useState(false)
  const [emailLinkClicked, setEmailLinkClicked] = useState(false)
  const { id } = useParams()
  const [projectDetail, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

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
    const getProject = async () => {
      try {
        const project = await getOneProject(id)
        setProjectDetails(project)
      } catch (error) {
        console.error('Failed to fetch project details:', error)
      }
    }
    getProject()
  }, [id])

  return (
    <div className='Project'>
      <div>
        {projectDetail && <AllTickets projectTracker={projectDetail} />}
      </div>
    </div>
  )
}
