import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { changePortalPage, sideMenuIconMap } from 'utils/helpers'
import './SideMenu.scss'

export const SideMenu = () => {
  const sideMenu = useAppSelector(selectSideMenu)
  const { title } = sideMenu
  const projectId = useAppSelector(selectUserProjectId)

  return (
    <div className='sidemenu'>
      <div className='sidemenu-content'>
        <div className='title'>
          <h2>{title}</h2>
        </div>
        <SideMenuLinks />
        <Link
          className='project-completion-link'
          to={`/project/${projectId}/complete`}
        >
          <button className='completion-overflow-btn'>Submit Project</button>
        </Link>
      </div>
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
  const { domain, icon, label, route, headerTitle } = linkDetails
  const LinkIcon = sideMenuIconMap[icon]
  const dispatch = useAppDispatch()
  const handlePortalLinkClick = () => changePortalPage(dispatch, headerTitle)

  return (
    <Link
      className='link'
      key={`${domain}-${label}`}
      to={route}
      onClick={handlePortalLinkClick}
    >
      <LinkIcon /> {label}
    </Link>
  )
}
