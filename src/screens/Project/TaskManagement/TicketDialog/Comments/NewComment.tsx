import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { createComment } from 'utils/api/comments'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import { generateDefaultPicture } from 'utils/helpers'
import {
  addCommentToTicket,
  selectProjectCompleted,
} from 'utils/redux/slices/projectSlice'
import { createReply } from 'utils/api/replies'
import { NewCommentProps } from 'interfaces/Comments'
import {
  selectHasConflictedTicket,
  selectTicketFields,
} from 'utils/redux/slices/taskBoardSlice'

export const NewComment = ({
  fetchComments,
  parentCommentId,
  toggleFetchComments,
}: NewCommentProps) => {
  const [inputText, setInputText] = useState('')
  const { _id: ticketId, status: ticketStatus } =
    useAppSelector(selectTicketFields)
  const hasConflictedTicket = useAppSelector(selectHasConflictedTicket)
  const {
    _id: userId,
    firstName,
    lastName,
    profilePicture,
  } = useAppSelector(selectAuthUser)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const dispatch = useAppDispatch()
  const isReply = parentCommentId ? true : false
  const userProfilePicture =
    profilePicture || generateDefaultPicture(firstName, lastName)
  const placeholder = isReply
    ? 'Reply to this comment.'
    : 'Give your feedback here.'
  const commentClass = isReply ? 'REPLY' : 'PARENT'

  const createOnEnter = async e => {
    if (hasConflictedTicket) return
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCreate(e.target.value.slice(0, -1))
    }
  }

  const handleCreate = async inputText => {
    if (hasConflictedTicket || projectCompleted) return
    if (isSandboxId(ticketId || parentCommentId)) {
      dispatch(errorSnackbar('This feature is disabled for the sandbox!'))
      setInputText('')
      return
    }

    let response
    const commentPayload = {
      authorId: userId,
      content: inputText,
      ticketId,
    }

    if (!isReply) {
      response = await createComment(commentPayload)
    } else {
      const replyPayload = { ...commentPayload, parentCommentId }
      response = await createReply(replyPayload)
    }

    if (response.error) {
      dispatch(errorSnackbar(response.error))
    } else {
      if (!isReply) {
        dispatch(
          addCommentToTicket({
            commentId: response._id,
            ticketId,
            ticketStatus,
          })
        )
      }
      toggleFetchComments(!fetchComments)
      setInputText('')
    }
  }

  const handleInputChange = e => setInputText(e.target.value)
  const handleSendClick = () => handleCreate(inputText)

  return (
    <div className={`comment-input-banner ${commentClass}`}>
      <img src={userProfilePicture} alt='commentor-profile-pic' />
      <TextField
        className='comment-input'
        disabled={hasConflictedTicket || projectCompleted}
        onKeyUp={createOnEnter}
        placeholder={placeholder}
        value={inputText}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <SendAdornment
              handleSendClick={handleSendClick}
              disabled={hasConflictedTicket || projectCompleted}
            />
          ),
        }}
        multiline
      />
    </div>
  )
}

const SendAdornment = ({ handleSendClick, disabled }) => (
  <InputAdornment
    onClick={handleSendClick}
    position='end'
    sx={{
      cursor: disabled ? 'default' : 'pointer',
      marginLeft: 0,
      padding: '0 12px 0 16px',
    }}
  >
    <SendOutlinedIcon />
  </InputAdornment>
)
