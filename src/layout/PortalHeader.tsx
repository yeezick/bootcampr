import React from 'react'
import './styles/PortalHeader.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'

export const PortalHeader = () => {
  const { pageTitle } = useAppSelector(selectSideMenu)
  return (
    <div className='portal-header-wrapper'>
      <div className='portal-header'>
        <h1>{pageTitle}</h1>
      </div>
    </div>
  )
}
