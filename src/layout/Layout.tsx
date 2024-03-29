import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectUserExperience,
  selectUserId,
  uiStatus,
} from 'utils/redux/slices/userSlice'
import { SideMenu } from './'
import { Nav } from './'
import { Footer } from 'layout/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  selectBanner,
  selectPortal,
} from 'utils/redux/slices/userInterfaceSlice'
import './styles/Layout.scss'
import {
  buildPortal,
  determinePortalFromUrl,
  doesUrlBelongToPortal,
} from 'utils/helpers'
import { PortalHeader } from './PortalHeader'
import { selectProjectId } from 'utils/redux/slices/projectSlice'
import sandboxBanner from '../assets/Images/sandbox-banner.png'
import { PrimaryButton } from 'components/Buttons'

export const Layout = ({ children }) => {
  const status = useAppSelector(uiStatus)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const { pathname } = useLocation()

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
  const { active: activePortal, type: portalType } =
    useAppSelector(selectPortal)
  const { active: activeBanner, type: bannerType } =
    useAppSelector(selectPortal)
  const experience = useAppSelector(selectUserExperience)
  const projectId = useAppSelector(selectProjectId)
  const userId = useAppSelector(selectUserId)
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const portal = searchParams.get('portal')

  useEffect(() => {
    let routeId
    if (activePortal) {
      routeId = portalType === 'project' ? projectId : userId
      buildPortal(dispatch, portalType, routeId, experience)
    } else if (portal) {
      routeId = portal === 'project' ? projectId : userId
      buildPortal(dispatch, portal, routeId, experience)
    } else {
      const { domain } = determinePortalFromUrl(pathname, userId, projectId)
      routeId = domain === 'project' ? projectId : userId
      buildPortal(dispatch, domain, routeId, experience)
    }
  }, [activePortal, portalType, activeBanner])

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

const PortalBanner = () => {
  const { active, type } = useAppSelector(selectBanner)
  const userId = useAppSelector(selectUserId)
  const navigate = useNavigate()

  const handleJoinTeam = () => navigate(`/onboarding/${userId}`)

  if (!active) return null

  if (type === 'sandbox') {
    return (
      <div className='banner'>
        <img src={sandboxBanner} />
        <div className='text'>
          <h2>Bootcampr Sandbox</h2>
          <p>
            Feel free to explore the platform and try the features. Join an
            agile team when you're ready!
          </p>
        </div>
        <PrimaryButton
          className='cta-button'
          text='Join a team'
          handler={handleJoinTeam}
        />
      </div>
    )
  }

  if (type === 'waitlist') {
    return (
      <div className='banner'>
        <img src={sandboxBanner} />
        <div className='text'>
          <h2>Bootcampr Sandbox</h2>
          <p>
            Feel free to explore the platform and try the features. Join an
            agile team when you're ready!
          </p>
        </div>
        <PrimaryButton
          className='cta-button'
          text='Join a team'
          handler={handleJoinTeam}
        />
      </div>
    )
  }
}

const DefaultView = ({ children }) => {
  return (
    <div className='main-wrapper'>
      <div className='main-content-container'>{children}</div>
    </div>
  )
}
