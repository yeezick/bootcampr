import { Link } from 'react-router-dom'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'
import { selectUserNotInTeam } from 'utils/redux/slices/projectSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { DomainLink } from 'layout/DomainLink'
import { sideMenuIconMap } from 'utils/helpers'
import './SideMenu.scss'

export const SideMenu = () => {
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useAppSelector(selectUserProjectId)
  const notInTeam = useAppSelector(selectUserNotInTeam)

  const btnClassName = `${
    notInTeam ? 'disabled-btn' : 'completion-overflow-btn'
  }`

  return (
    <div className='sidemenu-container'>
      <div className='title'>
        <h2>{title}</h2>
      </div>
      <SideMenuLinks notInTeam={notInTeam} />
      <Link
        className='project-completion-link'
        to={`/project/${projectId}/complete`}
      >
        <button className={btnClassName} disabled={notInTeam}>
          Submit Project
        </button>
      </Link>
    </div>
  )
}

const SideMenuLinks = ({ notInTeam }) => {
  const { links } = useAppSelector(selectSideMenu)

  return (
    <div className='sidemenu-links'>
      {links.map(link => (
        <MenuLink linkDetails={link} notInTeam={notInTeam} />
      ))}
    </div>
  )
}

const MenuLink = ({ linkDetails, notInTeam }) => {
  const { domain, icon, label, route } = linkDetails
  const LinkIcon = sideMenuIconMap[icon]

  const isCalendarOrTask = route === 'Calendar' || route === 'Task Management'
  const linkClassName = `${
    notInTeam && isCalendarOrTask ? 'link-disable' : 'link'
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
