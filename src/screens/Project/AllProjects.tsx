import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from 'utils/api'
import { ProjectInterface } from 'interfaces'
// import { TaskManagement } from './ProjectDetails/TaskManagement'

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
          <Link to={`/project/${project._id}/details`}>
            project details
          </Link>{' '}
          <br></br>
          <Link to={`/project/${project._id}/task-management`}>
            Task Management
          </Link>
        </div>
      ))}
    </div>
  )
}
