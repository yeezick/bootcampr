import { useState } from 'react'
import { FormControl, FormHelperText } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'
import { verifyEmail } from 'utils/api'

export const Email = ({ setFormValues }) => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputId = 'email'
  const sampleEmail = ' (ex. jeanine@bootcampr.io)'

  const validateEmail = async e => {
    const email = e.target.value
    const { status, message } = await verifyEmail(email)

    if (status >= 400) {
      setError(true)
      setErrorMessage(message)
    } else if (status === 200) {
      setError(false)
      setErrorMessage('')
    }
  }

  const handleEmailChange = e => {
    handleFormInputChange(e, setFormValues)
  }
  return (
    <div className='email'>
      <FormControl className='sign-up-input-container' variant='standard'>
        <label className='form-label' htmlFor={inputId}>
          Email
          <span className='email-label-helper'>{sampleEmail}</span>
        </label>
        <input
          id={inputId}
          name={inputId}
          className='form-input'
          onBlur={validateEmail}
          onChange={handleEmailChange}
          required
          type={inputId}
        />
        {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  )
}
