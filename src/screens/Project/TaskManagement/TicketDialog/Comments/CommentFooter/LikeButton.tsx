import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { useEffect, useState } from 'react'
import { updateComment } from 'utils/api/comments'
import { updateReply } from 'utils/api/replies'
import { determineLikeIcon, errorSnackbar } from 'utils/helpers/commentHelpers'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import { likeCommentEvent } from 'utils/redux/actions/socketActions'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'

export const LikeButton = ({ comment, isDisabled }) => {
  const { likes, _id: commentId } = comment
  const [likedByUser, toggleLikedByUser] = useState(false)
  const likers = useAppSelector(selectUsersById(likes))
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()
  const isReply = comment.parentId ? true : false

  useEffect(() => {
    if (likes.includes(userId)) {
      toggleLikedByUser(true)
    } else {
      toggleLikedByUser(false)
    }
  }, [likes, userId])

  //BC-763
  const handleCommentLike = async () => {
    if (isDisabled) return

    if (isSandboxId(commentId)) {
      dispatch(errorSnackbar('This feature is disabled for the sandbox!'))
    } else {
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

      let updatedResponse
      if (isReply) {
        updatedResponse = await updateReply(commentId, updatedLikes)
      } else {
        updatedResponse = await updateComment(commentId, updatedLikes)
      }

      if (updatedResponse.error) {
        dispatch(errorSnackbar('There was an error updating the likes'))
      } else {
        dispatch(likeCommentEvent())
      }
    }
  }

  const tooltipTitle =
    likers.length > 0 &&
    likers.map(liker => `${liker.firstName} ${liker.lastName}`).join(', ')
  const isButtonDisabled = isDisabled ? 'disabled' : ''

  return (
    <LikeToolTip
      title={tooltipTitle}
      placement='top-start'
      slotProps={TooltipSlotProps}
    >
      <div className={`like-button ${isButtonDisabled}`}>
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
