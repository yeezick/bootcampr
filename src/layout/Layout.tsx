import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { verify } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  uiStatus,
  updateAuthUser,
} from 'utils/redux/slices/userSlice'
import { SideMenu } from './'
import { Nav } from './'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation, useSearchParams } from 'react-router-dom'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import {
  setSideMenu,
  resetSideMenu,
  selectSideMenu,
} from 'utils/redux/slices/userInterfaceSlice'
import './Layout.scss'
import {
  buildProjectPortalSideMenu,
  buildSettingsSideMenu,
} from 'utils/helpers'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const { _id: userId, project } = useAppSelector(selectAuthUser)
  const sideMenu = useAppSelector(selectSideMenu)
  const [searchParams, setSearchParams] = useSearchParams()
  const { state } = location
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
      determineSideMenu(state.domain, project, userId)
    } else {
      dispatch(resetSideMenu())
    }
  }, [state])

  /**
   * This function determines the domain when manually routing to the app from an email link
   * The email link requires the domain query param.
   * Ex: ?domain=project
   * TODO: This will not work for users who copy-paste urls.
   */
  useEffect(() => {
    const domain = searchParams.get('domain')
    if (domain) {
      determineSideMenu(domain, project, userId)
    }
  }, [])

  const determineSideMenu = (domain, projectId, userId) => {
    if (domain === 'project') {
      dispatch(setSideMenu(buildProjectPortalSideMenu(userId, projectId)))
    } else if (domain === 'settings') {
      dispatch(setSideMenu(buildSettingsSideMenu(projectId)))
    } else {
      dispatch(resetSideMenu())
    }
  }

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      <div className='main-wrapper'>
        {sideMenu?.active && <SideMenu />}
        <div className={'main-content-container'}>{children}</div>
      </div>
      <Footer />
    </>
  )
}
