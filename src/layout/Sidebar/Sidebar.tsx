import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { logOut } from 'utilities/api/users'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import {
  logoutAuthUser,
  selectAuthUser,
  toggleSidebar,
} from 'utilities/redux/slices/users/userSlice'
import './Sidebar.scss'

export const Sidebar = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId, firstName, lastName, profilePicture } = authUser
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
    <div
      className={visibleSidebar ? 'sidebar-container active' : 'hide-sidebar'}
    >
      <div className='menu-btn' onClick={toggleSidebarHandler}>
        <i></i>
        <i></i>
        <i></i>
      </div>
      {/* src='https://bootcampruserimage.s3.amazonaws.com/63f2b2b0993429db1f2521b4' */}
      <div className='current-user'>
        <div className='image'>
          <img
            src={profilePicture}
            alt={`${firstName} profile picture`}
            width='110'
            height='110'
          />
        </div>
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
        <Link className='link' to={`/`} onClick={handleLogout}>
          <AiFillStar size={18} /> Sign Out
        </Link>
      </div>
    </div>
  )
}
