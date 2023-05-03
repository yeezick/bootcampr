import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../../utils/api/projects'
import { ProjectInterface } from 'interfaces'

const ProjectPage = ({}) => {
  const [getAllProjectsData, setGetAllProjectsData] = useState<
    ProjectInterface[] | null
  >()

  useEffect(() => {
    const projects = async () => {
      const project = await getAllProjects()
      setGetAllProjectsData(project)
    }
    projects()
  }, [])
  return (
    <div>
      <Link to='/CreateProject'> CreateProject</Link>
      {getAllProjectsData?.map(project => (
        <div key={project._id}>
          <h1>getAllProjectsData</h1>
          <Link to={`/project/${project._id}`}>project details</Link>
        </div>
      ))}
    </div>
  )
}

export default ProjectPage
