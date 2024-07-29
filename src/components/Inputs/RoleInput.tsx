import { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

export const RoleInput = ({
  label,
  name,
  setFormValues,
  formValues,
  required,
}) => {
  const [error, setError] = useState(false)
  const errorMessage = error ? 'Please select your role' : ''
  const roleOptions = [
    'Software Engineer',
    'UX Designer',
    'Product Manager',
  ] as const

  const handleChange = (event: SelectChangeEvent) => {
    setFormValues(prev => ({ ...prev, role: event.target.value }))
  }

  const validateInput = event => {
    const role = event.target.value
    if (role === '') {
      setError(true)
    } else {
      setError(false)
    }
  }

  const roleInputStyles = {
    border: error ? '1px solid #d32f2f' : '1px solid #212121',
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: formValues.role === '' ? '#616161' : '#212121',
    fontSize: '16px',
    fontWeight: '400',
    height: '42px',
    lineHeight: '24px',
    padding: '8px 12px 8px 0px',
    width: '100%',
  }

  return (
    <div className={`signup-input-${name}`}>
      <FormControl className='sign-up-input-container'>
        <label className='form-label' htmlFor={name}>
          {label}
        </label>
        <div className='form-input'>
          <Select
            labelId={`${name}-select`}
            value={formValues.role}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onBlur={validateInput}
            onChange={handleChange}
            required={required}
            sx={roleInputStyles}
          >
            <MenuItem value='' disabled>
              <em>Select your role</em>
            </MenuItem>
            {roleOptions.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
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
