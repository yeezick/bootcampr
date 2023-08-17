import { AllTickets } from 'components/Kanban'
import { ProjectInterface } from 'interfaces'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOneProject, getOneUser } from 'utils/api'
import { Checkbox } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import './Project.scss'
import { toggleChatOpen } from 'utils/redux/slices/chatSlice'

export const ProjectDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('unread')
  const userId = queryParams.get('user')
  const [emailLinkClicked, setEmailLinkClicked] = useState(false)
  const { id } = useParams()
  const [projectDetail, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const user = await getOneUser(userId)
        dispatch(updateAuthUser(user))
        localStorage.setItem('bootcamprAuthToken', token)

        navigate(`/project/${user.project}`)
        setEmailLinkClicked(true)
      }
      fetchUser()
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
