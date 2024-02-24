import React, { useState } from 'react'
import { forgotPasswordEmailVerification } from 'utils/api'
import { ForgotPasswordInterface } from 'interfaces'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'
import './ResetPassword.scss'

export const ForgotPasswordModal = ({
  onClose,
  forgotPasswordModal,
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
    stopPropagation: () => void
  }) => {
    e.stopPropagation()
    setEmail(e.target.value)
  }

  return (
    <>
      <Dialog open={forgotPasswordModal} maxWidth='xs' fullWidth>
        <div className='password-modal'>
          {error && <div className='feedback-message'>{error}</div>}
          {success && <div className='feedback-message'>{success}</div>}
          <div className='modal-content'>
            <DialogTitle className='modal-title'>
              Forgot your Password?
            </DialogTitle>
            <DialogContent className='modal-body'>
              We all forget things. <br></br>
              Enter the email address you used to sign up. <br></br>
              We'll send you an email to reset your password.
            </DialogContent>
            <input
              className='email-input'
              type='email'
              value={email}
              onChange={handleEmail}
            />
          </div>
        </div>
        <DialogActions className='reset-btns' id='btn-container'>
          <button className='cancel-reset' onClick={onClose}>
            Cancel
          </button>
          <button className='reset-password-btn' onClick={handleSubmit}>
            Send email
          </button>
        </DialogActions>
      </Dialog>
    </>
  )
}
