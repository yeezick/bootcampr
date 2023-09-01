import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

interface ForgotPasswordProps {
  onClose: () => void
  title?: string
  resetApiEndpoint: string
  onSuccessMessage?: string
  onFailureMessage?: string
  customStyles?: React.CSSProperties
}

const ForgotPasswordModal: React.FC<ForgotPasswordProps> = ({
  onClose,
  title = 'Forgot Password',
  resetApiEndpoint,
  onSuccessMessage = 'Password reset email sent successfully!',
  onFailureMessage = 'An error occurred. Please try again.',
  customStyles = {},
}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(resetApiEndpoint, { email })
      setSuccess(onSuccessMessage)
      setError('')
    } catch (err) {
      setError(onFailureMessage)
      setSuccess('')
    }
  }

  return (
    <div className='modal' style={customStyles}>
      <div className='modal-content'>
        <h2>{title}</h2>
        {error && <div className='error-message'>{error}</div>}
        {success && <div className='success-message'>{success}</div>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type='submit'>Reset Password</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

ForgotPasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  resetApiEndpoint: PropTypes.string.isRequired,
  onSuccessMessage: PropTypes.string,
  onFailureMessage: PropTypes.string,
  customStyles: PropTypes.object,
}

export default ForgotPasswordModal
