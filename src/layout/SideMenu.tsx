import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import { blankDayJs, changePortalPage, generateDayJs } from 'utils/helpers'
import { iconMap } from 'utils/components/Icons'
import { PrimaryButton } from 'components/Buttons'
import {
  selectCompletedInfo,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import './styles/SideMenu.scss'
import { selectUserExperience } from 'utils/redux/slices/userSlice'

export const SideMenu = () => {
  const navigate = useNavigate()
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useAppSelector(selectProjectId)
  const { projectSubmissionDate } = useAppSelector(selectProjectTimeline)
  const { active } = useAppSelector(selectSideMenu)
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const userExperience = useAppSelector(selectUserExperience)
  const [isDisabled, setIsDisabled] = useState(true)
  const isProjectSubmitted = Boolean(projectSubmissionInfo.deployedUrl)
  const isActiveUser = userExperience === 'active'

  const handleProjectCompletion = () =>
    navigate(`/project/${projectId}/complete`)

  //TODO: Currently set to check every minute but we can adjust as needed, there might be a delay in seconds.
  useEffect(() => {
    if (!projectSubmissionDate) {
      return
    }
    const checkSubmissionTime = () => {
      const submissionDate = generateDayJs(projectSubmissionDate)
      const now = blankDayJs()
      setIsDisabled(
        now.isBefore(submissionDate, 'minute') || isProjectSubmitted
      )
    }

    checkSubmissionTime()

    const dateCheckInterval = setInterval(checkSubmissionTime, 60000)

    return () => clearInterval(dateCheckInterval)
  }, [active, projectSubmissionDate, isProjectSubmitted])

  const btnClassName = `completion-btn ${!projectId && 'disabled-btn'}`

  return (
    <div className='sidemenu'>
      <div className='sidemenu-content'>
        <div className='title'>
          <h2>{title}</h2>
        </div>
        <SideMenuLinks />
        {title === 'Project Portal' && isActiveUser && (
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
