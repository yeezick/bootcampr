import { updateComment } from 'utils/api/tickets'

export const CommentContent = ({ comment }) => {
  const { content } = comment
  return (
    <div className='comment-content'>
      <p>{content}</p>
    </div>
  )
}
