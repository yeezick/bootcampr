import { Link, useLocation } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { logOut } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'
import Avatar from 'components/Avatar/Avatar'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { DomainLink } from 'layout/DomainLink'
import './Sidebar.scss'

export const Sidebar = () => {
  const { _id: userId, firstName, lastName } = useAppSelector(selectAuthUser)
  const { active, links, title } = useAppSelector(selectSideMenu)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    logOut()
    dispatch(logoutAuthUser())
  }

  return (
    <div className='sidebar-container'>
      <div className='current-user'>
        {active ? (
          <h1>{title}</h1>
        ) : (
          <>
            <Avatar />
            <div>
              <p className='user-name'>
                {firstName} {lastName}
              </p>
              <Link className='edit-profile' to={`/users/${userId}/edit`}>
                Edit Profile
              </Link>
            </div>
          </>
        )}
      </div>
      <div className='nav-links'>
        {links &&
          links.map(link => (
            <DomainLink
              className='link'
              domain={link.domain}
              route={link.route}
            >
              <AiFillStar size={18} viewBox={'0 0 1024 900'} /> {link.label}
            </DomainLink>
          ))}
      </div>
      <Link to={`/project-completion`}>
        <button className='completion-overflow-btn'>Submit Project</button>
      </Link>
    </div>
  )
}
