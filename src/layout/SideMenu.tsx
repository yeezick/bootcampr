import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { changePortalPage } from 'utils/helpers'
import { iconMap } from 'utils/components/Icons'
import { PrimaryButton } from 'components/Buttons'
import { useSelector } from 'react-redux'
import {
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import dayjs from 'dayjs'
import './styles/SideMenu.scss'

export const SideMenu = () => {
  const navigate = useNavigate()
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useSelector(selectProjectId)
  const { projectSubmissionDate } = useSelector(selectProjectTimeline)
  const [isDisabled, setIsDisabled] = useState(
    +projectSubmissionDate > dayjs().valueOf()
  )

  const handleProjectCompletion = () =>
    navigate(`/project/${projectId}/complete`)

  //TODO: Currently set to check every minute but we can adjust as needed
  useEffect(() => {
    const dateCheckInterval = setInterval(() => {
      setIsDisabled(+projectSubmissionDate > dayjs().valueOf())
    }, 60000)

    return () => clearInterval(dateCheckInterval)
  }, [projectSubmissionDate])

  const btnClassName = `completion-btn ${!projectId && 'disabled-btn'}`

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
            disabled={isDisabled}
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
  const location = useLocation()
  const { domain, icon, label, route, headerTitle } = linkDetails
  const LinkIcon = iconMap[icon]
  const dispatch = useAppDispatch()
  const linkClassName = `${'link'} ${
    location.pathname === route ? 'current-location' : ''
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
