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
import './Layout.scss'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import { useLocation } from 'react-router-dom'
import { storeUserProject } from 'utils/helpers/stateHelpers'
import { ProjectPortal } from 'screens/Landing'
import { selectRenderProjectPortal } from 'utils/redux/slices/projectSlice'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const projectPortal = useAppSelector(selectRenderProjectPortal)

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
      {userId && <Sidebar />}
      <div className={userId ? 'layout-container active' : ''}>
        {projectPortal ? (
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
