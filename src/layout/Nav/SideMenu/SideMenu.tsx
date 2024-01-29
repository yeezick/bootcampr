import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { changePortalPage } from 'utils/helpers'
import './SideMenu.scss'
import { iconMap } from 'utils/components/Icons'
import { PrimaryButton } from 'components/Buttons'

export const SideMenu = () => {
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useAppSelector(selectUserProjectId)
  const navigate = useNavigate()
  const handleProjectCompletion = () =>
    navigate(`/project/${projectId}/complete`)
  const btnClassName = `${
    projectId ? 'completion-overflow-btn' : 'disabled-btn'
  }`

  return (
    <div className='sidemenu'>
      <div className='sidemenu-content'>
        <div className='title'>
          <h2>{title}</h2>
        </div>
        <SideMenuLinks />
        {title === 'Project Portal' && (
          <PrimaryButton
            className={btnClassName}
            disabled={!projectId}
            handler={handleProjectCompletion}
            text='Submit Project'
          />
        )}
      </div>
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
  const projectId = useAppSelector(selectUserProjectId)
  const { domain, icon, label, route, headerTitle } = linkDetails
  const LinkIcon = iconMap[icon]
  const dispatch = useAppDispatch()
  const isCalendarOrTask =
    label === 'Calendar' || label === 'Task Management' || label === 'Team'
  const linkClassName = `${
    !projectId && isCalendarOrTask ? 'link-disable' : 'link'
  }`
  const handlePortalLinkClick = () => changePortalPage(dispatch, headerTitle)

  return (
    <Link
      className={linkClassName}
      key={`${domain}-${label}`}
      to={route}
      onClick={handlePortalLinkClick}
    >
      <LinkIcon /> {label}
    </Link>
  )
}
