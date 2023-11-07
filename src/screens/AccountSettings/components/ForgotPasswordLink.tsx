import { SettingsModal } from 'components/SettingsModal/SettingsModal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPasswordEmailVerification } from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

export const ForgotPasswordLink = () => {
  const navigate = useNavigate()
  const authUser = useAppSelector(selectAuthUser)
  const [email, setEmail] = useState('')
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setIsError(false)
    setEmail(e.target.value)
  }

  const handleSubmitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const emailSent = await forgotPasswordEmailVerification(email)

      if (emailSent) {
        if (!emailSent.data.status) {
          setIsError(true)
        } else {
          setIsError(false)
          navigate(
            `/success/${authUser._id}?screen=${SuccessQueryParam.resetPasswordEmail}`
          )
        }
      }
    } catch (error) {
      console.error('Error updating password.', error)
    }
  }

  const openModal = () => {
    setForgotPasswordModal(true)
  }

  const closeModal = () => {
    setForgotPasswordModal(false)
    setEmail('')
    setIsError(false)
  }

  return (
    <>
      <div id='forgot-password-link' onClick={openModal}>
        Forgot your password?
      </div>
      <SettingsModal
        isOpen={forgotPasswordModal}
        handleCancel={closeModal}
        handleConfirm={handleSubmitForgotPassword}
        heading='Forgot your password?'
        body={`We all forget things.`}
        body2={`Enter the email address you used to sign up.`}
        body3={`We'll send you an email to reset your password.`}
        inputType='email'
        inputValue={email}
        inputOnChange={handleEmailChange}
        inputPlaceholder='email@emailaddress.com'
        isError={isError}
        inputErrorMessage='Invalid email address. Enter the email address you used to sign up with Bootcampr.'
        cancelButtonLabel='Cancel'
        confirmButtonLabel='Send email'
      />
    </>
  )
}
