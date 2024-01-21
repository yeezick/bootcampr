import { Draggable } from '@hello-pangea/dnd'
import { useAppDispatch } from 'utils/redux/hooks'
import {
  setTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import { fetchIcon } from 'utils/components/Icons'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'

export const TicketTab = ({ idx, ticketDetail }) => {
  const { title, _id: ticketId } = ticketDetail
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    dispatch(setVisibleTicketDialog('edit'))
    dispatch(setTicketFields({ ...ticketDetail }))
  }

  return (
    <Draggable key={ticketId} draggableId={ticketId} index={idx}>
      {provided => (
        <div
          id={ticketId}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div onClick={handleOpenModal} className='ticket-tab'>
            <div className='tab-details'>
              <p>{title}</p>
              <TabIcons ticketDetail={ticketDetail} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

const TabIcons = ({ ticketDetail }) => {
  const { assignee, comments, description, dueDate, link } = ticketDetail
  return (
    <div className='tab-icons'>
      {assignee && <TeamAvatar userId={assignee} size='tiny' />}
      {description && fetchIcon('description')}
      {link && fetchIcon('link')}
      {comments.length > 0 && (
        <div className='comments'>
          {fetchIcon('chatBubble')}
          <span className='count'>{comments.length}</span>
        </div>
      )}
      {dueDate && <span>{dueDate}</span>}
    </div>
  )
}
