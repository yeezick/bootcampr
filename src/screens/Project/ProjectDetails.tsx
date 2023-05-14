import { AllTickets } from 'components/Kanban/AllTickets/AllTickets'
import { ProjectInterface } from 'interfaces'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { AllTickets } from 'components/Kanban/AllTickets/AllTickets'

import { getOneProject } from 'utils/api'

const ProjectDetails = () => {
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
    <div>
      <h1>{projectDetail?.title}</h1>
      <h1>{projectDetail?.duration}</h1>
      {projectDetail && <AllTickets projectTracker={projectDetail} />}
    </div>
  )
}

export default ProjectDetails
