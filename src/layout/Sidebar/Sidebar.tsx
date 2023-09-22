import { Link, useLocation } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { logOut } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'
import Avatar from 'components/Avatar/Avatar'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { useEffect, useState } from 'react'
import './Sidebar.scss'
import { DomainLink } from 'layout/DomainLink'

export const Sidebar = () => {
  const [links, setLinks] = useState(null)
  const {
    _id: userId,
    firstName,
    lastName,
    project,
  } = useAppSelector(selectAuthUser)
  const authUser = useAppSelector(selectAuthUser)
  const sideMenu = useAppSelector(selectSideMenu)
  const dispatch = useAppDispatch()
  const { state } = useLocation()
  console.log('state', state)

  useEffect(() => {
    if (state) {
      const { domain } = state
      if (domain === 'project') {
        console.log('sideMenu', sideMenu)
        setLinks(buildProjectPortalLinks(userId, project))
      } else if (domain === 'settings') {
        setLinks(buildSettingsPortalLinks(userId))
      }
    }
  }, [sideMenu])
  console.log('sidebar sidemenu', sideMenu)
  const handleLogout = () => {
    logOut()
    dispatch(logoutAuthUser())
  }

  const buildProjectPortalLinks = (userId, projectId) => [
    {
      domain: 'project',
      label: 'My Profile',
      route: `/users/${userId}`,
    },
    {
      domain: 'project',
      label: 'Calendar',
      route: `/project/${projectId}/calendar`,
    },
    {
      domain: 'project',
      label: 'Sign Out',
      route: `/`,
      onClick: handleLogout,
    },
  ]

  const buildSettingsPortalLinks = userId => [
    {
      domain: 'settings',
      label: 'Email',
      route: `/users/${userId}/settings/email`,
    },
    {
      domain: 'settings',
      label: 'Password',
      route: `/users/${userId}/settings/password`,
    },
    {
      domain: 'settings',
      label: 'Account',
      route: `/users/${userId}/settings/account`,
      onClick: handleLogout,
    },
  ]

  return (
    <div className='sidebar-container'>
      <div className='current-user'>
        {sideMenu.active ? (
          <h1>{sideMenu.title}</h1>
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
              onClick={link.onClick || null}
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
