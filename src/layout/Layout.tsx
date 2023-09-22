import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { verify } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  uiStatus,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { Sidebar } from './'
import { Nav } from './'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation } from 'react-router-dom'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import {
  setSideMenu,
  resetSideMenu,
  selectSideMenu,
} from 'utils/redux/slices/userInterfaceSlice'
import './Layout.scss'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const sideMenu = useAppSelector(selectSideMenu)
  const { state } = useLocation()

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

  useEffect(() => {
    if (state) {
      const { domain } = state
      if (domain === 'project') {
        // Can't this be done at the reducer level?
        const projectPortal = {
          title: 'Project Portal',
          links: buildProjectPortalLinks(userId, ''),
          active: true,
        }
        dispatch(setSideMenu(projectPortal))
      } else if (domain === 'settings') {
        const settingsPortal = {
          active: true,
          links: buildSettingsPortalLinks(userId),
          title: 'Settings',
        }
        dispatch(setSideMenu(settingsPortal))
      }
    } else {
      console.log('rset')
      dispatch(resetSideMenu())
    }
  }, [state, sideMenu.active])
  console.log('sidemenu', sideMenu, '\n', state)

  const buildProjectPortalLinks = (userId, projectId) => [
    {
      label: 'My Profile',
      route: `/users/${userId}`,
    },
    {
      label: 'Calendar',
      route: `/project/${projectId}/calendar`,
    },
    {
      label: 'Sign Out',
      route: `/`,
      // onClick: handleLogout,
    },
  ]

  const buildSettingsPortalLinks = userId => [
    {
      label: 'Email',
      route: `/users/${userId}/settings/email`,
    },
    {
      label: 'Password',
      route: `/users/${userId}/settings/password`,
    },
    {
      label: 'Account',
      route: `/users/${userId}/settings/account`,
      onClick: () => {},
    },
  ]

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      {sideMenu.active && <Sidebar />}
      <div>
        <div
          className={
            location.pathname !== '/'
              ? 'main-content-container'
              : 'landing-main-content-container'
          }
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}
/**
 * import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { verify } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  uiStatus,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { Sidebar } from './'
import { Nav } from './'
import './Layout.scss'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation, useParams } from 'react-router-dom'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { ProjectPortal } from 'screens/Landing'
import {
  buildProjectPortal,
  resetProjectPortal,
  selectProjectPortal,
} from 'utils/redux/slices/userInterfaceSlice'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const projectPortal = useAppSelector(selectProjectPortal)
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

  // useEffect, if not in a project portal domain, deactivate sidebar
  const baseDomains = ['/', '/how-to', '/about-us']
  useEffect(() => {
    if (baseDomains.includes(pathname)) {
      dispatch(resetProjectPortal())
    } else if (pathname.includes('/settings/')) {
      const settingsPortal = {
        active: true,
        links: ['Email', 'Password', 'Account'],
        title: 'Settings',
      }
      dispatch(buildProjectPortal(settingsPortal))
    }
    console.log('params', location)
  }, [pathname])

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      {userId && <Sidebar />}
      <div className={userId ? 'layout-container active' : ''}>
        {projectPortal.active ? (
          <ProjectPortal />
        ) : (
          <div
            className={
              location.pathname !== '/'
                ? 'main-content-container'
                : 'landing-main-content-container'
            }
          >
            {children}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

 */
