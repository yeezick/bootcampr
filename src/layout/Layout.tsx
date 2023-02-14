import React, { useEffect, useState } from 'react'
import { Loader } from '../components/Loader/Loader'
import { verify } from '../utilities/api/users'
import { useAppDispatch, useAppSelector } from '../utilities/redux/hooks'
import {
  uiStatus,
  updateAuthUser,
} from '../utilities/redux/slices/users/userSlice'
import { Sidebar } from './Sidebar/Sidebar'
import { Nav } from './Nav/Nav'
import './Layout.scss'
import Footer from '../components/Footer/Footer'

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
    <>
      <Nav />
      <Sidebar />
      <div className={visibleSidebar ? 'layout-container active' : ''}>
        <div>{children}</div>
      </div>
      <Footer />
    </>
  )
}
