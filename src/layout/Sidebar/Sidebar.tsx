import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { logOut } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  logoutAuthUser,
  selectAuthUser,
  toggleSidebar,
} from 'utils/redux/slices/userSlice'
import './Sidebar.scss'

export const Sidebar = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId, firstName, lastName } = authUser
  const dispatch = useAppDispatch()
  const visibleSidebar = useAppSelector(
    state => state.ui.sidebar.visibleSidebar
  )

  const handleLogout = () => {
    logOut()
    dispatch(logoutAuthUser())
    dispatch(toggleSidebar())
  }

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className={visibleSidebar ? 'sidebar-container' : 'hide-sidebar'}>
      <div className='menu-btn' onClick={toggleSidebarHandler}>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div className='current-user'>
        <div className='image'></div>
        <div>
          <p className='user-name'>
            {firstName} {lastName}
          </p>

          <Link className='edit-profile' to={`/users/${userId}/edit`}>
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='nav-links'>
        <Link className='link' to={`/users/${userId}`}>
          <AiFillStar size={18} viewBox={'0 0 1024 900'} /> My Profile
        </Link>
        <Link className='link' to={'/availability'}>
          Availability Demo
        </Link>
        <Link className='link' to={`/`} onClick={handleLogout}>
          <AiFillStar size={18} /> Sign Out
        </Link>
        <Link className='link' to={`/onboarding/${userId}`}>
          Onboarding
        </Link>
      </div>
    </div>
  )
}
