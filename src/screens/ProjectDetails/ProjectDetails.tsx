import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AllTicket } from 'screens/TicketManager/AllTicket/AllTicket'
import { getOneProject } from 'utils/api'

function ProjectDetails(props) {
  const { id } = useParams()

  const [projectDetail, setProjectDetails] = useState<any>(null)
  console.log(projectDetail)

  useEffect(() => {
    const getProject = async () => {
      try {
        const project = await getOneProject(id)
        console.log(project)

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
      {projectDetail ? (
        <AllTicket
          projectTracker={projectDetail}
          projectDetail={projectDetail}
          setProjectDetails={setProjectDetails}
        />
      ) : null}
    </div>
  )
}

export default ProjectDetails
