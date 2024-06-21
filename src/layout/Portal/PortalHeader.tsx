import '../styles/PortalHeader.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectPortal } from 'utils/redux/slices/userInterfaceSlice'
import { TicketFilter } from 'screens/Project/TaskManagement/TaskBoard/TicketFilter'
import { useLocation } from 'react-router-dom'
import { selectUserProjectList } from 'utils/redux/slices/userSlice'
import { getProjectHeaderTitle } from 'utils/helpers'

export const PortalHeader = () => {
  const { active, type, headerTitle } = useAppSelector(selectPortal)
  const projetcsList = useAppSelector(selectUserProjectList)
  const { pathname } = useLocation()
  const projectHeaderTitle =
    headerTitle === 'Product Details' &&
    getProjectHeaderTitle(pathname, projetcsList)

  if (active && type === 'project') {
    return (
      <div className='portal-header'>
        <div className='body'>
          <h2>{projectHeaderTitle || headerTitle}</h2>
          {pathname.includes('tasks') && <TicketFilter />}
        </div>
      </div>
    )
  } else return null
}
