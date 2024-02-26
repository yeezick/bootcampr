import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from 'utils/api'
import { ProjectInterface } from 'interfaces'

export const AllProjects = () => {
  const [getAllProjectsData, setGetAllProjectsData] =
    useState<ProjectInterface[]>()

  useEffect(() => {
    const projects = async () => {
      const project = await getAllProjects()
      setGetAllProjectsData(project)
    }
    projects()
  }, [])

  return (
    <div>
      <Link to='/create-project'> Create Project</Link>
      {getAllProjectsData?.map(project => (
        <div key={project._id}>
          <h1>getAllProjectsData</h1>
          <Link to={`/project/${project._id}`}>product details</Link>
        </div>
      ))}
    </div>
  )
}
