import { BiLike } from 'react-icons/bi'

export const CommentFooter = ({
  author,
  currentUser,
  isReply,
  renderReplyInputBar,
  allowEditComment,
  deleteThisComment,
  likeComment,
  likes,
}) => {
  return (
    <div className='comment-actions'>
      {author.userId !== currentUser._id && !isReply && (
        <div onClick={renderReplyInputBar}>
          <p>Reply</p>
        </div>
      )}
      {author.userId === currentUser._id && (
        <>
          <div onClick={allowEditComment}>
            <p>Edit</p>
          </div>
          <div onClick={deleteThisComment}>
            <p>Delete</p>
          </div>
        </>
      )}
      <div onClick={likeComment}>
        {/* make this conditionally filled or not depending on users like status */}
        <BiLike />
      </div>
      <div>
        {likes.length} Like{likes.length > 1 && 's'}
      </div>
    </div>
  )
}
