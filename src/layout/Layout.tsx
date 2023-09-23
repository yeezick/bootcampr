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
import { buildSideMenu } from 'utils/helpers'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const { _id: userId, project } = useAppSelector(selectAuthUser)
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
        dispatch(setSideMenu(buildSideMenu('project', userId, project)))
      } else if (domain === 'settings') {
        dispatch(setSideMenu(buildSideMenu('settings', userId, project)))
      } else {
        dispatch(resetSideMenu())
      }
    } else {
      dispatch(resetSideMenu())
    }
  }, [state])

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      {sideMenu?.active && <Sidebar />}
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
