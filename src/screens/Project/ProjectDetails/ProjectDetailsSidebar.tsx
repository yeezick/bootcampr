import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './ProjectDetails.scss'
import { useEffect, useState } from 'react'
import { ProjectInterface } from 'interfaces'
import { getOneProject } from 'utils/api'

//TODO: add hover affect on links
//TODO: fix calendar route

export const ProjectDetailsSidebar = () => {
  const { id } = useParams()
  const [projectDetails, setProjectDetails] = useState<ProjectInterface | null>(
    null
  )

  useEffect(() => {
    const getProject = async () => {
      try {
        const project = await getOneProject(id)
        setProjectDetails(project)
      } catch (error) {
        console.error('failed to fetch project details', error)
      }
    }
    getProject()
  }, [id])

  return (
    <>
      <div className='project-details-sidebar'>
        <div className='nav-container'>
          <div className='nav-header'>
            <h1>Project portal</h1>
          </div>
          <div className='nav-links'>
            <div className='project-details-link'>
              <Link className='link' to={`/project/${id}/details`}>
                <AiFillStar size={18} viewBox={'0 0 1024 900'} /> Project
                Details
              </Link>
            </div>
            <div className='team-link'>
              <Link className='link' to={`/project/${id}/team`}>
                <AiFillStar size={18} viewBox={'0 0 1024 900'} /> Team
              </Link>
            </div>
            <div className='calendar-link'>
              <Link className='link' to={`project/123/calendar`}>
                <AiFillStar size={18} viewBox={'0 0 1024 900'} /> Calendar
              </Link>
            </div>
            <div className='task-management-link'>
              <Link className='link' to={`/project/${id}/task-management`}>
                <AiFillStar size={18} viewBox={'0 0 1024 900'} /> Task
                Management
              </Link>
            </div>
          </div>
        </div>
        <div className='submit-project-container'>
          <button className='submit-btn'>Submit Project</button>
        </div>
      </div>
    </>
  )
}
