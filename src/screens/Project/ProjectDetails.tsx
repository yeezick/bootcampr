import { AllTickets } from 'components/Kanban'
import { ProjectInterface } from 'interfaces'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Project.scss'
import { getOneProject } from 'utils/api'
import { Checkbox } from '@mui/material'

export const ProjectDetails = () => {
  const { id } = useParams()
  const [projectDetail, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

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
