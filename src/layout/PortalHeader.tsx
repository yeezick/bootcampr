import React from 'react'
import './styles/PortalHeader.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import { TicketFilter } from 'screens/Project/TaskManagement/TaskBoard/TicketFilter'

export const PortalHeader = () => {
  const { active, type, headerTitle } = useAppSelector(selectPortal)
  if (active && type === 'project') {
    return (
      <div className='portal-header'>
        <div className='body'>
          <h1>{headerTitle}</h1>
          {headerTitle === 'Task Management' && <TicketFilter />}
        </div>
      </div>
    )
  } else return null
}
