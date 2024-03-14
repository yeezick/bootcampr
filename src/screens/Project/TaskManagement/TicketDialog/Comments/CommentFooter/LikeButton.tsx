import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { useEffect, useState } from 'react'
import { updateComment } from 'utils/api/comments'
import { determineLikeIcon } from 'utils/helpers/commentHelpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const LikeButton = ({
  commentId,
  fetchComments,
  likes,
  toggleFetchComments,
}) => {
  const [likedByUser, toggleLikedByUser] = useState(false)
  const likers = useAppSelector(selectUsersById(likes))
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    if (likes.includes(userId)) {
      toggleLikedByUser(true)
    } else {
      toggleLikedByUser(false)
    }
  }, [likes, userId])

  //BC-763
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

  const tooltipTitle = likers
    .map(liker => `${liker.firstName} ${liker.lastName}`)
    .join(', ')

  return (
    <LikeToolTip
      title={tooltipTitle}
      placement='top-start'
      slotProps={TooltipSlotProps}
    >
      <div className='like-button'>
        <div onClick={handleCommentLike}>{determineLikeIcon(likedByUser)}</div>
        <p>{likes.length}</p>
      </div>
    </LikeToolTip>
  )
}

const LikeToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#424242',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '8px',
  },
}))

const TooltipSlotProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -14],
        },
      },
    ],
  },
}
