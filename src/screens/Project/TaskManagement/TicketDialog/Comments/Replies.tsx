import { Comment } from './Comment'
import { NewComment } from './NewComment'

export const Replies = ({
  parentComment,
  toggleFetchComments,
  fetchComments,
}) => {
  const { replies, _id: parentCommentId } = parentComment

  return (
    <div className='replies-container'>
      {replies.map(reply => {
        return (
          <Comment
            comment={reply}
            fetchComments={fetchComments}
            isReply={true}
            key={reply._id}
            toggleFetchComments={toggleFetchComments}
          />
        )
      })}
      <NewComment
        parentCommentId={parentCommentId}
        toggleFetchComments={toggleFetchComments}
        fetchComments={fetchComments}
      />
    </div>
  )
}
