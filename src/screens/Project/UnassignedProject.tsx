import { Link } from 'react-router-dom'
import { ProjectIcons } from 'utils/data/projectConstants'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './Project.scss'

export const UnassignedProject = () => {
  const authUser = useAppSelector(selectAuthUser)

  return (
    <div className='unassigned'>
      <img src={ProjectIcons.Unassigned} alt='unassigned' />
      <h1>Patience!</h1>
      <div className='unassigned'>
        <p>
          You are not assigned to a project yet. In the meantime, familiarize
          yourself with Collabify and get a headstart to being a star applicant!
        </p>
        <Link to={`/users/${authUser._id}`}>How it works</Link>
        {/* can be replaced by a 'How-To' screen */}
      </div>
    </div>
  )
}
