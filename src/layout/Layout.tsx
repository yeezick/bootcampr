import React, { useEffect } from 'react'
import { Loader } from 'components/Loader/Loader'
import { verify } from 'utils/api/users'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { uiStatus, updateAuthUser } from 'utils/redux/slices/userSlice'
import { Sidebar } from './'
import { Nav } from './'
import './Layout.scss'
import { Footer } from 'layout/Footer/Footer'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const visibleSidebar = useAppSelector(
    state => state.ui.sidebar.visibleSidebar
  )

  useEffect(() => {
    const verifyUser = async () => {
      const authUser = await verify()
      if (authUser) dispatch(updateAuthUser(authUser))
    }
    verifyUser()
  }, [])

  if (status.isLoading) {
    return <Loader />
  }

  return (
    <div className='layout-container'>
      <ScrollToTop />
      <Nav />
      <Sidebar />
      <div className={`layout-children ${visibleSidebar && 'active'}`}>
        <div className='main-content-container'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
