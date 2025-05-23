import { CommonModal } from 'components/CommonModal/CommonModal'
import { ForgotPasswordLinkProps } from 'interfaces/AccountSettingsInterface'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  forgotPasswordEmailVerification,
  getOneUserByEmail,
  logOut,
} from 'utils/api'
import { SuccessQueryParam } from 'utils/data/authSettingsConstants'
import { successSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'

export const ForgotPasswordLink = ({
  hyperlinkText = 'Forgot password?',
}: ForgotPasswordLinkProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [email, setEmail] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setIsError(false)
    setEmail(e.target.value)
  }

  const emptyInput = () => {
    if (email === '') {
      setIsInputEmpty(true)
    } else {
      setIsInputEmpty(false)
    }
  }

  useEffect(() => {
    emptyInput()
  }, [email])

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
            `/success?screen=${SuccessQueryParam.resetPasswordEmail}&email=${email}`
          )
          dispatch(successSnackbar('Email sent!'))
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
        {hyperlinkText}
      </div>
      <CommonModal
        isOpen={forgotPasswordModal}
        handleCancel={closeModal}
        handleConfirm={handleSubmitForgotPassword}
        confirmButtonDisabled={isInputEmpty}
        heading='Forgot your password?'
        body={`We all forget things.`}
        body2={`Enter the email address you used to sign up.`}
        body3={`We'll send you an email to reset your password.`}
        inputType='email'
        inputValue={email}
        inputOnChange={handleEmailChange}
        inputPlaceholder='email@emailaddress.com'
        isError={isError}
        inputErrorMessage='Invalid email address. Enter the email address you used to sign up with Collabify.'
        cancelButtonLabel='Cancel'
        confirmButtonLabel='Send email'
        customWidth={360}
      />
    </>
  )
}
