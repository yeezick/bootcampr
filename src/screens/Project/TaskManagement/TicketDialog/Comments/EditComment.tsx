import { useState } from 'react'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch } from 'utils/redux/hooks'
import { CommentHeader } from './CommentHeader'
import { TextField } from '@mui/material'
import { updateComment } from 'utils/api/comments'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'

export const EditComment = ({
  comment,
  toggleEditMode,
  toggleFetchComments,
}) => {
  const { authorId, _id: commentId, content, createdAt } = comment
  const [updatedComment, setUpdatedComment] = useState(content)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleCancel = () => toggleEditMode(false)
  const handleInputChange = e => setUpdatedComment(e.target.value)

  const handleSave = async e => {
    setIsLoading(true)
    const updateResponse = await updateComment(commentId, {
      content: updatedComment,
    })

    if (updateResponse.status === 200) {
      dispatch(successSnackbar('Changes saved!'))
    } else {
      dispatch(errorSnackbar(updateResponse.error.message))
    }

    toggleFetchComments(state => !state)
    toggleEditMode(false)
    setIsLoading(false)
  }

  return (
    <div className='edit-comment'>
      <div className='comment-card'>
        <CommentHeader authorId={authorId} createdAt={createdAt} />
        <TextField
          value={updatedComment}
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
