import { FormControl, FormHelperText } from '@mui/material'
import { useState } from 'react'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'

export const Text = ({ label, name, setFormValues, required }) => {
  const [error, setError] = useState(false)

  const handleTextChange = e => {
    const name = e.target.value.trim()
    if (name.length) {
      setError(false)
    }
    handleFormInputChange(e, setFormValues)
  }

  const validateInput = e => {
    const name = e.target.value.trim()
    if (name === '') {
      setError(true)
    } else {
      setError(false)
    }
  }

  const errorMessage = error ? 'This field is required' : ''

  return (
    <div className={`signup-input-${name}`}>
      <FormControl className='sign-up-input-container' variant='standard'>
        <label className='form-label' htmlFor={name}>
          {label}
        </label>
        <div className='form-input'>
          <input
            aria-required={required}
            id={name}
            name={name}
            onBlur={validateInput}
            onChange={handleTextChange}
            required={required}
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
