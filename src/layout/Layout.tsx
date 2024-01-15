import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { verify } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectUserId,
  uiStatus,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { SideMenu } from './'
import { Nav } from './'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation, useSearchParams } from 'react-router-dom'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import './Layout.scss'
import {
  buildPortal,
  determinePortalFromUrl,
  doesUrlBelongToPortal,
} from 'utils/helpers'
import { PortalHeader } from './PortalHeader'
import { selectProjectId } from 'utils/redux/slices/projectSlice'

export const Layout = ({ children }) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const { pathname } = useLocation()

  useEffect(() => {
    const verifyUser = async () => {
      const authUser = await verify()
      if (authUser) {
        storeUserProject(dispatch, authUser.project)
        dispatch(updateAuthUser(authUser))
      }
    }
    verifyUser()
  }, [dispatch])

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      {doesUrlBelongToPortal(pathname, userId, projectId) ? (
        <PortalView>{children}</PortalView>
      ) : (
        <DefaultView>{children}</DefaultView>
      )}
      <Footer />
    </>
  )
}

const PortalView = ({ children }) => {
  const { active, type } = useAppSelector(selectPortal)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const portal = searchParams.get('portal')

  useEffect(() => {
    let routeId
    if (active) {
      routeId = type === 'project' ? projectId : userId
      buildPortal(dispatch, type, routeId)
    } else if (portal) {
      routeId = portal === 'project' ? projectId : userId
      buildPortal(dispatch, portal, routeId)
    } else {
      const { domain } = determinePortalFromUrl(pathname, userId, projectId)
      routeId = domain === 'project' ? projectId : userId
      buildPortal(dispatch, domain, routeId)
    }
  }, [])

  return (
    <div className='main-wrapper'>
      <SideMenu />
      <div className='portal-layout'>
        <PortalHeader />
        <div className='portal-screen'>{children}</div>
      </div>
    </div>
  )
}

const DefaultView = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <div className='main-content-container'>{children}</div>
    </div>
  )
}
