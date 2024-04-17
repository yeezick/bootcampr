import { CommonModal } from 'components/CommonModal/CommonModal'
import { SnackBarSeverity } from 'interfaces/SnackBarToast'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUnverifiedEmail, verifyEmail } from 'utils/api'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import './EmailSentConfirmation.scss'

export const UpdateEmailAddressLink = ({ setEmail }) => {
  const dispatch = useDispatch()
  const localUser = JSON.parse(sessionStorage.getItem('bootcamprLocalUser'))
  const [newEmail, setNewEmail] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleEmailChange = e => {
    const newEmail = e.target.value.trim()
    setNewEmail(newEmail)
    setIsError(false)
    setErrorMessage('')
  }

  const handleSubmit = async () => {
    try {
      const { status, message } = await verifyEmail(newEmail)

      if (status !== 200) {
        setErrorMessage(message)
        setIsError(true)
        return
      }

      const response = await updateUnverifiedEmail(newEmail, localUser.userId)

      let toastSeverity: SnackBarSeverity = null

      if (response.status === 201) {
        const updatedLocalUser = {
          ...localUser,
          email: newEmail,
        }
        sessionStorage.setItem(
          'bootcamprLocalUser',
          JSON.stringify(updatedLocalUser)
        )
        setEmail(newEmail)

        toastSeverity = 'success'
        setShowModal(false)
        setErrorMessage('')
        setIsError(false)
        setNewEmail('')

        const friendlyMessage = response.data
          ? response.data.friendlyMessage
          : 'An error occurred'
        dispatch(
          createSnackBar({
            message: friendlyMessage,
            severity: toastSeverity,
          })
        )
      } else {
        toastSeverity = 'error'
        console.error('Bad request')
      }
    } catch (error) {
      console.error('Error updating email:', error)
    }
  }

  const onCloseModal = () => {
    setShowModal(false)
    setErrorMessage('')
    setIsError(false)
    setNewEmail('')
  }

  return (
    <>
      <div
        className='message-content update-email'
        onClick={() => setShowModal(true)}
      >
        Update your email address
      </div>
      {showModal && (
        <CommonModal
          isOpen={true}
          handleCancel={onCloseModal}
          handleConfirm={handleSubmit}
          heading='Update email address'
          body="We'll send the confirmation email to this email address."
          body2='You will also use it to log in.'
          inputType='email'
          inputValue={newEmail}
          inputOnChange={handleEmailChange}
          inputPlaceholder='email@emailaddress.com'
          isError={isError}
          inputErrorMessage={errorMessage}
          cancelButtonLabel='Cancel'
          confirmButtonLabel='Update email address'
          confirmButtonDisabled={!newEmail}
          customWidth={330}
        />
      )}
    </>
  )
}
