import React, { useState } from 'react'
import './ResetPassword.scss'
import { forgotPasswordEmailVerification } from 'utils/api'
import { ForgotPasswordInterface } from 'interfaces'

export const ForgotPasswordModal = ({
  onClose,
  onSuccessMessage,
  onFailureMessage,
}: ForgotPasswordInterface) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const emailSent = await forgotPasswordEmailVerification(email)
      if (emailSent) {
        setSuccess(onSuccessMessage)
        setError('')
      }
    } catch (err) {
      setError(onFailureMessage)
      setSuccess('')
    }
  }

  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEmail(e.target.value)
  }

  return (
    <div className='password-modal'>
      <svg
        className='close-modal-btn'
        onClick={onClose}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M18 6L6 18'
          stroke='#121212'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6 6L18 18'
          stroke='#121212'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      {error && <div className='feedback-message'>{error}</div>}
      {success && <div className='feedback-message'>{success}</div>}
      <div className='modal-content'>
        <div className='modal-title'>Forgot your Password?</div>
        <div className='modal-body'>
          We all forget things. <br></br>
          Enter the email address you used to sign up. <br></br>
          We'll send you an email to reset your password.
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className='email-input'
            type='email'
            value={email}
            onChange={handleEmail}
          />
          <div className='reset-btns'>
            <button className='cancel-reset' onClick={onClose}>
              Cancel
            </button>
            <button className='reset-password-btn' type='submit'>
              Send email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
