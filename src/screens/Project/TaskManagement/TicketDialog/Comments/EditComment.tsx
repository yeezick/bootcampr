import { useState } from 'react'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch } from 'utils/redux/hooks'
import { CommentHeader } from './CommentHeader'
import { TextField } from '@mui/material'
import { updateComment } from 'utils/api/comments'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { updateReply } from 'utils/api/replies'
import { editCommentEvent } from 'utils/redux/actions/socketActions'

export const EditComment = ({ comment, toggleEditMode }) => {
  const { authorId, _id: commentId, content, createdAt } = comment
  const [updatedContent, setUpdatedContent] = useState(content)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleCancel = () => toggleEditMode(false)
  const handleInputChange = e => setUpdatedContent(e.target.value)
  const isReply = comment.parentId ? true : false

  const handleSave = async e => {
    setIsLoading(true)
    let updateResponse
    if (isReply) {
      updateResponse = await updateReply(commentId, {
        content: updatedContent,
      })
    } else {
      updateResponse = await updateComment(commentId, {
        content: updatedContent,
      })
    }

    if (updateResponse.error) {
      dispatch(errorSnackbar(updateResponse.error))
    } else {
      dispatch(successSnackbar('Changes saved!'))
    }
    dispatch(editCommentEvent())
    toggleEditMode(false)
    setIsLoading(false)
  }

  return (
    <div className='edit-comment'>
      <div className='comment-card'>
        <CommentHeader authorId={authorId} createdAt={createdAt} />
        <TextField
          value={updatedContent}
          onChange={handleInputChange}
          multiline
        />
      </div>
      <ButtonContainer style={{ marginTop: '5px' }}>
        <SecondaryButton label='Cancel' onClick={handleCancel} />
        <PrimaryButton loading={isLoading} label='Save' onClick={handleSave} />
      </ButtonContainer>
    </div>
  )
}
