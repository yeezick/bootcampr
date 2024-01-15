import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUserProjectId } from 'utils/redux/slices/userSlice'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { changePortalPage } from 'utils/helpers'
import './SideMenu.scss'
import { iconMap } from 'utils/components/Icons'
import { PrimaryButton } from 'components/Buttons'

export const SideMenu = () => {
  const sideMenu = useAppSelector(selectSideMenu)
  const { title } = sideMenu
  const projectId = useAppSelector(selectUserProjectId)
  const navigate = useNavigate()

  const handleProjectCompletion = () =>
    navigate(`/project/${projectId}/complete`)

  return (
    <div className='sidemenu'>
      <div className='sidemenu-content'>
        <div className='title'>
          <h2>{title}</h2>
        </div>
        <SideMenuLinks />
        <PrimaryButton
          handler={handleProjectCompletion}
          text='Submit Project'
        />
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
  const LinkIcon = iconMap[icon]
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
