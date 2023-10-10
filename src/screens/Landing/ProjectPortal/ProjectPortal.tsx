import React from 'react'
import './ProjectPortal.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectSideMenu } from 'utils/redux/slices/userInterfaceSlice'

export const ProjectPortal = () => {
  const projectPortal = useAppSelector(selectSideMenu)
  return (
    <div className='portal-container'>
      <h1>
        {projectPortal.title === 'Settings'
          ? 'SETTINGS PORTAL'
          : 'PROJECT PORTAL'}
      </h1>
    </div>
  )
}
