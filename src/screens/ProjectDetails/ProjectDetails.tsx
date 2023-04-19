import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProject } from 'utils/api'

function ProjectDetails(props) {
  const { id } = useParams()

  const [projectDetail, setProjectDetails] = useState()
  console.log(projectDetail)
  useEffect(() => {
    const getProject = async () => {
      const project = await getOneProject(id)
      setProjectDetails(project)
    }
    getProject()
  }, [])
  return (
    <div>
      <h1>ProjectDetails</h1>
    </div>
  )
}

export default ProjectDetails
// isin't
