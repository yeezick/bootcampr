import { useEffect, useState } from 'react'
import { getTicketComments } from 'utils/api/tickets'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { TicketTextLabel } from '../Fields'
import { NewComment } from './InputBanner'
import { Comment } from './Comment'
import { CommentType } from 'interfaces/TaskBoardInterface'

export const TaskComments = ({ ticketId }) => {
  const user = useAppSelector(selectAuthUser)
  const [comments, setComments] = useState([])
  const [fetchComments, toggleFetchComments] = useState(false)

  useEffect(() => {
    const getComments = async () => {
      const response = await getTicketComments(ticketId)
      setComments(response)
    }
    getComments()
  }, [fetchComments])

  return (
    <div className='comments-container'>
      <TicketTextLabel icon={'chatBubble'} label='Comments' />
      <NewComment
        commentType={CommentType.Parent}
        ticketId={ticketId}
        user={user}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
      <div className='render-comments'>
        {comments?.map(comment => (
          <Comment
            comment={comment}
            toggleFetchComments={toggleFetchComments}
            fetchComments={fetchComments}
            currentUser={user}
            key={comment._id}
          />
        ))}
      </div>
    </div>
  )
}
