import { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, Input } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'

export const Email = ({ setFormValues }) => {
  const [error, setError] = useState(false)
  const inputId = 'email'
  const sampleEmail = ' (ex. jeanine@bootcampr.io)'

  const validateEmail = email => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (emailRegex.test(email)) setError(false)
    else setError(true)
    return emailRegex.test(email)
  }

  const handleEmailChange = e => {
    handleFormInputChange(e, setFormValues)
    validateEmail(e.target.value)
  }
  return (
    <div className='email'>
      <FormControl variant='standard'>
        <label className='form-label' htmlFor={inputId}>
          Email
          <span className='password-label-helper'>{sampleEmail}</span>
        </label>
        <input
          id={inputId}
          name={inputId}
          onChange={handleEmailChange}
          required
          type={inputId}
        />
        {error && (
          <FormHelperText error={true}>
            Please enter a valid email.
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}
