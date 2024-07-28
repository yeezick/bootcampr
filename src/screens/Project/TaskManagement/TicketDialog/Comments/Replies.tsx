import { Comment } from './Comment'
import { NewComment } from './NewComment'

export const Replies = ({ parentComment }) => {
  const { replies, _id: parentCommentId } = parentComment

  return (
    <div className='replies-container'>
      {replies.map(reply => {
        return <Comment comment={reply} isReply={true} key={reply._id} />
      })}
      <NewComment parentCommentId={parentCommentId} />
    </div>
  )
}
