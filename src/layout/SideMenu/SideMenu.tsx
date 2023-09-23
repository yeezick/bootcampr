import { Link } from 'react-router-dom'
import { logOut } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser } from 'utils/redux/slices/userSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { DomainLink } from 'layout/DomainLink'
import { sideMenuIconMap } from 'utils/helpers'
import './SideMenu.scss'

export const SideMenu = () => {
  const { title } = useAppSelector(selectSideMenu)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    logOut()
    dispatch(logoutAuthUser())
  }

  return (
    <div className='sidemenu-container'>
      <div className='title'>
        <h2>{title}</h2>
      </div>
      <SideMenuLinks />
      <Link to={`/project-completion`}>
        <button className='completion-overflow-btn'>Submit Project</button>
      </Link>
    </div>
  )
}

const SideMenuLinks = () => {
  const { links } = useAppSelector(selectSideMenu)

  return (
    <div className='sidemenu-links'>
      {links.map(link => (
        <MenuLink linkDetails={link} />
      ))}
    </div>
  )
}

const MenuLink = ({ linkDetails }) => {
  const { domain, icon, label, route } = linkDetails
  const LinkIcon = sideMenuIconMap[icon]

  return (
    <DomainLink className='link' domain={domain} route={route}>
      <LinkIcon /> {label}
    </DomainLink>
  )
}
