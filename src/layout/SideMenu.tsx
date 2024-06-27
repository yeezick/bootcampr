import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'
import {
  blankDayJs,
  changePortalPage,
  extractDomain,
  generateDayJs,
} from 'utils/helpers'
import { iconMap } from 'utils/components/Icons'
import {
  selectCompletedInfo,
  selectProjectId,
  selectProjectTimeline,
} from 'utils/redux/slices/projectSlice'
import './styles/SideMenu.scss'
import { PrimaryButton } from 'components/Buttons'
import {
  selectIsRecurringUser,
  selectUserExperience,
  selectUserHasMultipleProjects,
} from 'utils/redux/slices/userSlice'
import { SelectProject } from 'screens/Project/RecurringUser/SelectProject'

export const SideMenu = () => {
  const navigate = useNavigate()
  const { title } = useAppSelector(selectSideMenu)
  const projectId = useAppSelector(selectProjectId)
  const { projectSubmissionDate } = useAppSelector(selectProjectTimeline)
  const { active } = useAppSelector(selectSideMenu)
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const userExperience = useAppSelector(selectUserExperience)
  const [isDisabled, setIsDisabled] = useState(false)
  const isProjectSubmitted = projectSubmissionInfo.presenting !== null
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

  return (
    <div className='sidemenu'>
      <div className='sidemenu-content'>
        <div className='title'>
          <h2>{title}</h2>
        </div>
        <SideMenuLinks />
        {title === 'Project Portal' && isActiveUser && (
          <PrimaryButton
            // disabled={isDisabled}
            onClick={handleProjectCompletion}
            label='Submit project'
            style={{ bottom: 32, position: 'absolute', width: '235px' }}
          />
        )}
      </div>
    </div>
  )
}

const SideMenuLinks = () => {
  const { links } = useAppSelector(selectSideMenu)
  const isRecurringWaitlistUser = useAppSelector(selectIsRecurringUser)
  const userHasMultipleProjects = useAppSelector(selectUserHasMultipleProjects)
  const { pathname } = useLocation()
  const domain = extractDomain(pathname)
  const displayProjectSelector =
    (isRecurringWaitlistUser || userHasMultipleProjects) && domain === 'project'
  return (
    <div className='sidemenu-links'>
      {displayProjectSelector && <SelectProject />}
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
  const isRecurringUser = useAppSelector(selectIsRecurringUser)
  const currentProjectId = useAppSelector(selectProjectId)
  const disableLinks =
    isRecurringUser &&
    headerTitle !== 'Product Details' &&
    domain === 'project' &&
    (currentProjectId === 'waitlist' || !currentProjectId)

  const linkClassName = `link ${
    location.pathname === route ? 'current-location' : ''
  } ${disableLinks ? 'disabled-link' : ''}`

  const handlePortalLinkClick = event => {
    if (disableLinks) {
      event.preventDefault()
      return
    } else {
      changePortalPage(dispatch, headerTitle)
    }
  }

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
