import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { CommentType } from 'interfaces/TaskBoardInterface'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { createComment } from 'utils/api/comments'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { isSandboxId } from 'utils/helpers/taskHelpers'

export const NewComment = ({
  commentType,
  parentCommentId = undefined,
  ticketId = undefined,
  fetchComments,
  toggleFetchComments,
}) => {
  const user = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  let placeholderText =
    commentType === CommentType.Parent
      ? 'Give your feedback here.'
      : 'Reply to this comment.'
  const [inputText, setInputText] = useState('')
  const { _id, firstName, lastName, profilePicture } = user

  const createNewCommentOnEnter = async e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCreateComment(e.target.value.slice(0, -2))
    }
  }

  const handleCreateComment = async inputText => {
    const content = inputText
    const isReply = commentType === CommentType.Reply
    const commentPayload = {
      author: {
        userId: _id,
        firstName,
        lastName,
        profilePicture,
      },
      content,
      parentCommentId,
      ticketId,
      isReply,
    }

    if (isSandboxId(ticketId || parentCommentId)) {
      dispatch(errorSnackbar('This feature is disabled for the sandbox!'))
    } else {
      await createComment(commentPayload)
      toggleFetchComments(!fetchComments)
    }
    setInputText('')
  }

  const handleInputChange = e => setInputText(e.target.value)
  const handleSendClick = () => handleCreateComment(inputText)

  return (
    <div className={`comment-input-banner ${commentType}`}>
      <img src={profilePicture} alt='commentor-profile-picture' />
      <TextField
        className='comment-input'
        onKeyUp={createNewCommentOnEnter}
        placeholder={placeholderText}
        value={inputText}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: <SendAdornment handleSendClick={handleSendClick} />,
        }}
        multiline
      />
    </div>
  )
}

const SendAdornment = ({ handleSendClick }) => (
  <InputAdornment
    onClick={handleSendClick}
    position='end'
    sx={{ cursor: 'pointer', marginLeft: 0, padding: '0 12px 0 16px' }}
  >
    <SendOutlinedIcon />
  </InputAdornment>
)
