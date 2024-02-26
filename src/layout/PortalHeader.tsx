import React from 'react'
import './styles/PortalHeader.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import { TicketFilter } from 'screens/Project/TaskManagement/TaskBoard/TicketFilter'
import { useLocation } from 'react-router-dom'

export const PortalHeader = () => {
  const { active, type, headerTitle } = useAppSelector(selectPortal)
  const location = useLocation()
  if (active && type === 'project') {
    return (
      <div className='portal-header'>
        <div className='body'>
          <h2>{headerTitle}</h2>
          {location.pathname.includes('tasks') && <TicketFilter />}
        </div>
      </div>
    )
  } else return null
}
