import { CalendarTabs } from 'screens/Calendar'
import { EditableMeetingModal } from 'screens/Calendar'
import './Calendar.scss'
import { useState } from 'react'
import AlertNotification from './MeetingModal/EditableMeetingModal/AlertNotification'

export const CalendarScreen = () => {
  const [openAlert, setOpenAlert] = useState(false)

  const handleCloseAlert = () => setOpenAlert(false)
  const handleOpenAlert = () => setOpenAlert(true)

  return (
    <div className='calendar'>
      <CalendarTabs />
      <EditableMeetingModal handleOpenAlert={handleOpenAlert} />
      <AlertNotification
        handleCloseAlert={handleCloseAlert}
        openAlert={openAlert}
      />
    </div>
  )
}
