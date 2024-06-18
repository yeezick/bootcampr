import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { buildPortal, determinePortalFromUrl } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectProjectId,
  selectProjectUiLoading,
} from 'utils/redux/slices/projectSlice'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import {
  selectIsRecurringUser,
  selectUserExperience,
  selectUserId,
} from 'utils/redux/slices/userSlice'
import { PortalBanner, PortalHeader } from './'
import { SideMenu } from 'layout/SideMenu'
import { RecurringUserBanner } from './RecurringUserBanner'
import { Loader } from 'components/Loader/Loader'

export const PortalView = ({ children }) => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { active: activePortal, type: portalType } =
    useAppSelector(selectPortal)
  const experience = useAppSelector(selectUserExperience)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const isProjectLoading = useAppSelector(selectProjectUiLoading)
  const [searchParams] = useSearchParams()
  const portal = searchParams.get('portal')
  const currentPath = pathname.split('/').pop()
  const displayBanner = projectId === 'waitlist'

  useEffect(() => {
    let routeId
    let headerTitle
    switch (currentPath) {
      case 'team':
        headerTitle = 'Team Members'
        break
      case 'calendar':
        headerTitle = 'Scrum Calendar'
        break
      case 'tasks':
        headerTitle = 'Sprints'
        break
    }
    if (activePortal) {
      routeId = portalType === 'project' ? projectId : userId
      buildPortal(dispatch, portalType, routeId, experience, headerTitle)
    } else if (portal) {
      routeId = portal === 'project' ? projectId : userId
      buildPortal(dispatch, portal, routeId, experience, headerTitle)
    } else {
      const { domain } = determinePortalFromUrl(pathname, userId, projectId)
      routeId = domain === 'project' ? projectId : userId
      buildPortal(dispatch, domain, routeId, experience, headerTitle)
    }
  }, [activePortal, portalType, experience, projectId])

  return (
    <div className='portal-wrapper'>
      <PortalBanner />
      <div className='portal-layout'>
        <SideMenu />
        <div className='portal-view'>
          {isProjectLoading ? (
            <Loader />
          ) : (
            <>
              {displayBanner && <RecurringUserBanner />}
              <PortalHeader />
              <div className='portal-content'>{children}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
