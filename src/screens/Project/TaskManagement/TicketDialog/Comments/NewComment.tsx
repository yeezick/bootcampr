import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { createComment } from 'utils/api/comments'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { isSandboxId } from 'utils/helpers/taskHelpers'
import { generateDefaultPicture } from 'utils/helpers'
import { addCommentToTicket } from 'utils/redux/slices/projectSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { createReply } from 'utils/api/replies'
import { NewCommentProps } from 'interfaces/Comments'

export const NewComment = ({
  fetchComments,
  parentCommentId,
  toggleFetchComments,
}: NewCommentProps) => {
  const [inputText, setInputText] = useState('')
  const { _id: ticketId, status: ticketStatus } =
    useAppSelector(selectTicketFields)
  const {
    _id: userId,
    firstName,
    lastName,
    profilePicture,
  } = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const isReply = parentCommentId ? true : false
  const userProfilePicture =
    profilePicture || generateDefaultPicture(firstName, lastName)
  const placeholder = isReply
    ? 'Reply to this comment.'
    : 'Give your feedback here.'
  const commentClass = isReply ? 'REPLY' : 'PARENT'

  const createOnEnter = async e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleCreate(e.target.value.slice(0, -1))
    }
  }

  const handleCreate = async inputText => {
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
  const defaultImageURL = generateDefaultPicture(firstName, lastName) // BC-800 revert when image uploading feature is fixed

  return (
    <div className={`comment-input-banner ${commentClass}`}>
      <img src={defaultImageURL} alt='commentor-profile-picture' />
      <TextField
        className='comment-input'
        onKeyUp={createOnEnter}
        placeholder={placeholder}
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
