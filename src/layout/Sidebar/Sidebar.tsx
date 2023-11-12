import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { logOut } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'
import './Sidebar.scss'
import Avatar from 'components/Avatar/Avatar'
import { selectRenderProjectPortal } from 'utils/redux/slices/projectSlice'

export const Sidebar = () => {
  const { _id: userId, firstName, lastName } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const projectPortal = useAppSelector(selectRenderProjectPortal)

  const handleLogout = () => {
    logOut()
    dispatch(logoutAuthUser())
  }

  return (
    <div className='sidebar-container'>
      <div className='current-user'>
        {projectPortal ? (
          <h1>Project Portal</h1>
        ) : (
          <>
            <Avatar clickable={false} hasIcon={false} />
            <div>
              <p className='user-name'>
                {firstName} {lastName}
              </p>
              <Link className='edit-profile' to={`/users/${userId}/edit`}>
                Edit Profile
              </Link>{' '}
            </div>
          </>
        )}
      </div>
      <div className='nav-links'>
        <Link className='link' to={`/users/${userId}`}>
          <AiFillStar size={18} viewBox={'0 0 1024 900'} /> My Profile
        </Link>
        <Link className='link' to={'/all-projects'}>
          All Projects
        </Link>
        {/* TODO: replace with project id */}
        <Link className='link' to={'/project/123/calendar'}>
          Calendar
        </Link>
        <Link className='link' to={`/`} onClick={handleLogout}>
          <AiFillStar size={18} /> Sign Out
        </Link>
      </div>
      <Link to={`/project-completion`}>
        <button className='completion-overflow-btn'>Submit Project</button>
      </Link>
    </div>
  )
}
