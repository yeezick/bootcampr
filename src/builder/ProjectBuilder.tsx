import { Route, Routes } from 'react-router-dom'
import { AllTicket } from 'screens/TicketManager/AllTicket/AllTicket'

export const ProjectBuilder = () => {
  return (
    <Routes>
      <Route path=':id' element={<AllTicket />} />
    </Routes>
  )
}
