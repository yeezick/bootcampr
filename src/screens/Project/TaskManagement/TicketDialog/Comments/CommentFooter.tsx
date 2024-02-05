import { BiLike } from 'react-icons/bi'
import { deleteComment, updateComment } from 'utils/api/tickets'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const CommentFooter = ({
  comment,
  toggleFetchComments,
  fetchComments,
  toggleEditMode,
  toggleRenderReplyInput,
}) => {
  const userId = useAppSelector(selectUserId)
  const { author, isReply, likes, _id: commentId } = comment
  const allowEditComment = () => {
    toggleEditMode(state => !state)
  }

  const deleteThisComment = async () => {
    await deleteComment(commentId)
    toggleFetchComments(!fetchComments)
  }

  const likeComment = async () => {
    let updatedLikes
    if (likes.includes(userId)) {
      const idx = likes.indexOf(userId)
      updatedLikes = {
        likes: likes.splice(idx, 1),
      }
    } else {
      updatedLikes = {
        likes: [...likes, userId],
      }
    }
    await updateComment(commentId, updatedLikes)
    toggleFetchComments(!fetchComments)
  }

  const renderReplyInputBar = () => {
    toggleRenderReplyInput(true)
  }

  return (
    <div className='comment-actions'>
      {author.userId !== userId && !isReply && (
        <div onClick={renderReplyInputBar}>
          <p>Reply</p>
        </div>
      )}
      {author.userId === userId && (
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
