import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { buildPortal, determinePortalFromUrl } from 'utils/helpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import {
  selectUserExperience,
  selectUserId,
} from 'utils/redux/slices/userSlice'
import { PortalBanner, PortalHeader } from './'
import { SideMenu } from 'layout/SideMenu'

export const PortalView = ({ children }) => {
  const { active: activePortal, type: portalType } =
    useAppSelector(selectPortal)
  const experience = useAppSelector(selectUserExperience)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const portal = searchParams.get('portal')
  const currentPath = pathname.split('/').pop()

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
  }, [activePortal, portalType, experience])

  return (
    <div className='portal-wrapper'>
      <PortalBanner />
      <div className='portal-layout'>
        <SideMenu />
        <div className='portal-view'>
          <PortalHeader />
          <div className='portal-content'>{children}</div>
        </div>
      </div>
    </div>
  )
}
