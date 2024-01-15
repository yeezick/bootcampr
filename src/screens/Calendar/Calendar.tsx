import {
  CalendarHeader,
  CalendarTabs,
  EditableMeetingModal,
} from 'screens/Calendar'
import './Calendar.scss'
import { useState } from 'react'
import AlertNotification from './MeetingModal/EditableMeetingModal/AlertNotification'

export const CalendarScreen = () => {
  const [openAlert, setOpenAlert] = useState(true)

  const handleCloseAlert = () => setOpenAlert(false)
  const handleOpenAlert = () => setOpenAlert(true)

  return (
    <div className='calendar'>
      <CalendarHeader />
      <CalendarTabs />
      <EditableMeetingModal handleOpenAlert={handleOpenAlert} />
      <AlertNotification
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
      />
    </div>
  )
}
