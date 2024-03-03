import { saveTicketStatusChange } from 'utils/api/tickets'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { useParams } from 'react-router-dom'
import {
  reorderColumn,
  selectProjectTracker,
  updateTicketStatus,
} from 'utils/redux/slices/projectSlice'
import { StatusColumn } from './StatusColumn'
import '../../styles/BoardColumnStyles.scss'
import { doTicketsExist } from 'utils/helpers/taskHelpers'
import { DragDropContext } from 'react-beautiful-dnd'
import { reorderProjectColumn } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const BoardColumns = () => {
  const { projectId } = useParams()
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const columnOrder = ['toDo', 'inProgress', 'underReview', 'completed']
  const classes = doTicketsExist(projectTracker)
    ? 'columns-wrapper full-height'
    : 'columns-wrapper'

  const handleOnDragEnd = async movingTicket => {
    console.log('moving ticket', movingTicket)
    const { source, destination } = movingTicket

    // dropped outside the list
    if (!destination) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      const response = await reorderProjectColumn(projectId, {
        columnId: source.droppableId,
        oldIdx: source.index,
        newIdx: destination.index,
      })

      if (response.status !== 200) {
        dispatch(errorSnackbar(response.message))
      } else {
        dispatch(
          reorderColumn({
            columnId: source.droppableId,
            reorderedColumn: response.reorderedColumn,
          })
        )
      }
    }
    // } else {
    //   const result = move(
    //     this.getList(source.droppableId),
    //     this.getList(destination.droppableId),
    //     source,
    //     destination
    //   )

    //   this.setState({
    //     items: result.droppable,
    //     selected: result.droppable2,
    //   })
    // }
  }

  return (
    <div className={classes}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columnOrder.map(columnStatus => (
          <StatusColumn key={columnStatus} columnStatus={columnStatus} />
        ))}
      </DragDropContext>
    </div>
  )
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

// if (movingTicket) {
//   const targetTicketId = movingTicket.draggableId
//   const initialStatus = movingTicket.source.droppableId
//   const targetStatus = movingTicket.destination.droppableId

//   if (initialStatus !== targetStatus) {
//     const updatedTicket = await saveTicketStatusChange({
//       projectId,
//       targetStatus,
//       targetTicketId,
//       initialStatus,
//     })

//     if (updatedTicket) {
//       dispatch(
//         updateTicketStatus({
//           initialStatus,
//           updatedTicket,
//         })
//       )
//     } else {
//       // todo: display error toast
//     }
//   }
// }
