import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AllTicket } from 'screens/TicketManager/AllTicket/AllTicket'
import { getOneProject } from 'utils/api'

function ProjectDetails(props) {
  const { id } = useParams()

  const [projectDetail, setProjectDetails] = useState<any>(null)
  const [getAllTicket, setGetAllTicket] = useState<any>(
    projectDetail?.projectTracker
  )
  console.log(projectDetail)
  useEffect(() => {
    const getProject = async () => {
      const project = await getOneProject(id)
      setProjectDetails(project)
    }
    getProject()
  }, [id])
  return (
    <div>
      <h1>{projectDetail?.title}</h1>
      {/* <AllTicket
        getAllTicket={getAllTicket}
        setGetAllTicket={setGetAllTicket}
      /> */}
    </div>
  )
}

export default ProjectDetails
// isin't
