import { AllTickets } from 'components/Kanban'
import { ProjectInterface } from 'interfaces'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneProject } from 'utils/api'
import { Checkbox } from '@mui/material'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './Project.scss'

export const ProjectDetails = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const { id } = useParams()
  const [projectDetail, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

  useEffect(() => {
    !authUser.project && navigate('/project/unassigned')
  }, [])

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
