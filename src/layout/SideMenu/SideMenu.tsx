import { Link } from 'react-router-dom'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'
import { selectUserHasProjectId } from 'utils/redux/slices/userSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { DomainLink } from 'layout/DomainLink'
import { sideMenuIconMap } from 'utils/helpers'
import './SideMenu.scss'

export const SideMenu = () => {
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useAppSelector(selectUserProjectId)
  const userInTeam = useAppSelector(selectUserHasProjectId)

  const btnClassName = `${
    userInTeam ? 'completion-overflow-btn' : 'disabled-btn'
  }`

  return (
    <div className='sidemenu-container'>
      <div className='title'>
        <h2>{title}</h2>
      </div>
      <SideMenuLinks />
      <Link
        className='project-completion-link'
        to={`/project/${projectId}/complete`}
      >
        <button className={btnClassName} disabled={userInTeam}>
          Submit Project
        </button>
      </Link>
    </div>
  )
}

const SideMenuLinks = () => {
  const { links } = useAppSelector(selectSideMenu)

  return (
    <div className='sidemenu-links'>
      {links.map(link => (
        <MenuLink key={link.route} linkDetails={link} />
      ))}
    </div>
  )
}

const MenuLink = ({ linkDetails }) => {
  const userInTeam = useAppSelector(selectUserHasProjectId)
  const { domain, icon, label, route } = linkDetails
  const LinkIcon = sideMenuIconMap[icon]
  const isCalendarOrTask = label === 'Calendar' || label === 'Task Management'
  const linkClassName = `${
    !userInTeam && isCalendarOrTask ? 'link-disable' : 'link'
  }`

  return (
    <DomainLink
      className={linkClassName}
      domain={domain}
      key={`${domain}-${route}`}
      route={route}
    >
      <LinkIcon /> {label}
    </DomainLink>
  )
}
