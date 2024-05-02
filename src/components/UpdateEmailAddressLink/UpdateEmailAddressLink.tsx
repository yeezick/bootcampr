import { CommonModal } from 'components/CommonModal/CommonModal'
import { useState } from 'react'
import { updateUnverifiedEmail, verifyEmail } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const UpdateEmailAddressLink = ({ setEmail }) => {
  const authUser = useAppSelector(selectAuthUser)
  const localUser = JSON.parse(sessionStorage.getItem('bootcamprLocalUser'))
  const userId = localUser ? localUser.userId : authUser._id

  const [newEmail, setNewEmail] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleEmailChange = e => {
    const newEmail = e.target.value.trim()
    setNewEmail(newEmail)
    setIsError(false)
    setErrorMessage('')
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const { status, message } = await verifyEmail(newEmail)

      if (status !== 200) {
        setErrorMessage(message)
        setIsError(true)
        return
      }
      const response = await updateUnverifiedEmail(newEmail, userId)

      if (response.status !== 201) {
        setErrorMessage(response.data.friendlyMessage)
        setIsError(true)
        return
      }

      if (localUser) {
        const updatedLocalUser = {
          ...localUser,
          email: newEmail,
        }
        sessionStorage.setItem(
          'bootcamprLocalUser',
          JSON.stringify(updatedLocalUser)
        )
      }

      setEmail(newEmail)
      setShowModal(false)
      setErrorMessage('')
      setIsError(false)
      setNewEmail('')
      setIsLoading(false)
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
          handlingRequest={isLoading}
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
          customWidth={304}
        />
      )}
    </>
  )
}
