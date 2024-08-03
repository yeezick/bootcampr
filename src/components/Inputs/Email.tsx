import { useState } from 'react'
import { FormControl, FormHelperText } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'
import { verifyEmail } from 'utils/api'

export const Email = ({ setFormValues, setIsValidEmail }) => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputId = 'email'
  const sampleEmail = ' (ex. uxdesigner@collabify.ai)'

  const validateEmail = async e => {
    const email = e.target.value.trim()

    if (email === '') {
      setError(true)
      setErrorMessage('This field is required')
      return
    }

    const { status, message } = await verifyEmail(email)

    if (status >= 400) {
      setError(true)
      setErrorMessage(message)
      setIsValidEmail(false)
    } else if (status === 200) {
      setError(false)
      setErrorMessage('')
      setIsValidEmail(true)
    }
  }

  const handleEmailChange = e => {
    const email = e.target.value.trim()
    if (email.length) {
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
            onBlur={validateEmail}
            onChange={handleEmailChange}
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
