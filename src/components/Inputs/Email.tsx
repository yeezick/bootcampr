import { useState } from 'react'
import { FormControl, FormHelperText } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'
import { verifyEmail } from 'utils/api'

export const Email = ({ setFormValues, onValidationChange }) => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const inputId = 'email'
  const sampleEmail = ' (ex. uxdesigner@collabify.ai)'

  const validateEmail = async emailValue => {
    if (emailValue === '') {
      setError(true)
      setErrorMessage('This field is required')
      onValidationChange(false)
      return
    }

    const { status, message } = await verifyEmail(emailValue)

    if (status >= 400) {
      setError(true)
      setErrorMessage(message)
      onValidationChange(false)
    } else if (status === 200) {
      setError(false)
      setErrorMessage('')
      onValidationChange(true)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateEmail(e.target.value.trim())
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setEmail(value)
    if (value.length) {
      setError(false)
    }

    handleFormInputChange(e, setFormValues)
  }

  return (
    <div className='email'>
      <FormControl className='sign-up-input-container' variant='standard'>
        <label className='form-label' htmlFor={inputId}>
          Email
          <span className='email-label-helper'>{sampleEmail}</span>
        </label>
        <div className='form-input'>
          <input
            aria-required
            id={inputId}
            name={inputId}
            onBlur={handleBlur}
            onChange={handleEmailChange}
            value={email}
            required
            type={inputId}
            style={{
              borderColor: error ? '#d32f2f' : '',
            }}
          />
          {error && (
            <FormHelperText className='error-message' error={true}>
              {errorMessage}
            </FormHelperText>
          )}
        </div>
      </FormControl>
    </div>
  )
}
