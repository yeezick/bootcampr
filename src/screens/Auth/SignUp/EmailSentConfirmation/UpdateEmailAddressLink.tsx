import { CommonModal } from 'components/CommonModal/CommonModal'
import { UserInterface } from 'interfaces'
import { SnackBarSeverity } from 'interfaces/SnackBarToast'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateEmailAddress } from 'screens/Auth/Settings'
import {
  resendNewEmailLink,
  updateUnverifiedEmail,
  updateUsersEmail,
  verifyEmail,
} from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import {
  selectAuthUser,
  selectUserEmail,
  setConfirmationEmailAddress,
} from 'utils/redux/slices/userSlice'

export const UpdateEmailAddressLink = () => {
  const dispatch = useDispatch()
  const localUser = JSON.parse(localStorage.getItem('bootcamprLocalUser'))
  const [formData, setFormData] = useState({
    email: '',
    isError: false,
    errorMessage: '',
    showModal: false,
  })

  const handleEmailChange = e => {
    const newEmail = e.target.value.trim()

    setFormData(prevState => ({
      ...prevState,
      email: newEmail,
      isError: false,
    }))
  }

  const handleSubmit = async () => {
    console.log('Old Email: ', localUser.email) //old email
    console.log('AuthId: ', localUser.userId)
    try {
      const { email } = formData
      console.log('New Email: ', email) // new email
      const { status, message } = await verifyEmail(email)

      if (status !== 200) {
        setFormData(prevState => ({
          ...prevState,
          isError: true,
          errorMessage: message,
        }))
        return
      }

      const response = await updateUnverifiedEmail(
        localUser.email,
        email,
        localUser.userId
      )

      console.log(response.status)
      console.log(response.statusText)
      let toastSeverity: SnackBarSeverity = null

      if (response.status === 201) {
        const updatedLocalUser = {
          ...localUser,
          email: email,
        }
        localStorage.setItem(
          'bootcamprLocalUser',
          JSON.stringify(updatedLocalUser)
        )
        toastSeverity = 'success'
        setFormData(prevState => ({
          ...prevState,
          email: '',
          isError: false,
          errorMessage: '',
          showModal: false,
        }))

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
        console.error('resendNewEmailLink returned false')
      }
    } catch (error) {
      console.error('Error updating email:', error)
    }
  }

  const onCloseModal = () => {
    setFormData({
      email: '',
      isError: false,
      errorMessage: '',
      showModal: false,
    })
  }

  return (
    <>
      <div
        onClick={() =>
          setFormData(prevState => ({ ...prevState, showModal: true }))
        }
      >
        Update your email address
      </div>
      {formData.showModal && (
        <CommonModal
          isOpen={true}
          handleCancel={onCloseModal}
          handleConfirm={handleSubmit}
          heading='Update email address'
          body="We'll send the confirmation email to this email address."
          body2='You will also use it to log in.'
          inputType='email'
          inputValue={formData.email}
          inputOnChange={handleEmailChange}
          inputPlaceholder='email@emailaddress.com'
          isError={formData.isError}
          inputErrorMessage={formData.errorMessage}
          cancelButtonLabel='Cancel'
          confirmButtonLabel='Update email address'
          confirmButtonDisabled={!formData.email}
          // customWidth={350} //address custom styles later
        />
      )}
    </>
  )
}
