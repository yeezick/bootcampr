import { useEffect, useState } from 'react'
import { updateComment } from 'utils/api/tickets'
import { determineLikeIcon } from 'utils/helpers/commentHelpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const LikeButton = ({
  commentId,
  fetchComments,
  likes,
  toggleFetchComments,
}) => {
  const [likedByUser, toggleLikedByUser] = useState(false)
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    if (likes.includes(userId)) {
      toggleLikedByUser(true)
    } else {
      toggleLikedByUser(false)
    }
  }, [likes])

  //TODO: Revisit this, each execution triggers 8 api calls?
  const handleCommentLike = async () => {
    let updatedLikes
    if (likes.includes(userId)) {
      updatedLikes = {
        likes: likes.filter(likeId => likeId !== userId),
      }
    } else {
      updatedLikes = {
        likes: [...likes, userId],
      }
    }
    await updateComment(commentId, updatedLikes)
    toggleFetchComments(!fetchComments)
  }

  return (
    <div className='like-button'>
      <div onClick={handleCommentLike}>{determineLikeIcon(likedByUser)}</div>
      <p>{likes.length}</p>
    </div>
  )
}
