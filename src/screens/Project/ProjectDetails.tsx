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
  const onlyGetMyTicket = () => {
    setAllTaskChecked(false)
    setMyTaskChecked(true)
    console.log('onlyGetMyTicket', projectDetail)
    if (projectDetail) {
      const myTickets = Object.keys(projectDetail?.projectTracker)?.map(
        tickets => {
          return projectDetail?.projectTracker[tickets]?.filter(ticket => {
            return ticket?.assignee === authUser?._id
          })
        }
      )
      const newProjectDetail = {
        ...projectDetail,
        projectTracker: {
          ...projectDetail.projectTracker,
        },
      }
      setProjectDetails(newProjectDetail)
    }
  }

  const getAllTickets = () => {
    setAllTaskChecked(true)
    setMyTaskChecked(false)
    setProjectDetails(projectDetail)
  }
  return (
    <div className='Project'>
      <div>
        <div className='Project-header'>
          <h1>Kanban board</h1>
        </div>
        <div className='Project-filter'>
          <span>
            <Checkbox checked={allTaskChecked} onClick={getAllTickets} />
            <p>All Task</p>
          </span>
          <span>
            <Checkbox
              onClick={() => onlyGetMyTicket()}
              checked={myTaskChecked}
            />
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
