import { DragDropContext } from '@hello-pangea/dnd'
import { saveTicketStatusChange } from 'utils/api/tickets'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import {
  selectProjectTracker,
  updateTicketStatus,
} from 'utils/redux/slices/projectSlice'
import { StatusColumn } from './StatusColumn'
import '../../styles/BoardColumnStyles.scss'
import { doTicketsExist } from 'utils/helpers/taskHelpers'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const columnOrder = ['toDo', 'inProgress', 'underReview', 'completed']
  const classes = doTicketsExist(projectTracker)
    ? 'columns-wrapper full-height'
    : 'columns-wrapper'

  const handleOnDragEnd = async movingTicket => {
    if (movingTicket) {
      const targetTicketId = movingTicket.draggableId
      const initialStatus = movingTicket.source.droppableId
      const targetStatus = movingTicket.destination.droppableId

      if (initialStatus !== targetStatus) {
        const updatedTicket = await saveTicketStatusChange({
          projectId,
          targetStatus,
          targetTicketId,
          initialStatus,
        })

        if (updatedTicket) {
          dispatch(
            updateTicketStatus({
              initialStatus,
              updatedTicket,
            })
          )
        } else {
          // todo: display error toast
        }
      }
    }
  }

  return (
    <div className={classes}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columnOrder.map((columnStatus, idx) => (
          <StatusColumn
            key={`${columnStatus}+${idx}`}
            columnStatus={columnStatus}
          />
        ))}
      </DragDropContext>
    </div>
  )
}
