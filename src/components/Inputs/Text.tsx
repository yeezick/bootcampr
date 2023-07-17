import { FormControl, InputLabel, Input } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'

export const Text = ({ label, name, setFormValues, required }) => {
  const handleTextChange = e => {
    handleFormInputChange(e, setFormValues)
  }
  return (
    <div className={`signup-input-${name}`}>
      <FormControl variant='standard'>
        <label className='form-label' htmlFor={name}>
          {label}
        </label>
        <input
          className='form-input'
          id={name}
          name={name}
          onChange={handleTextChange}
          required={required}
        />
      </FormControl>
    </div>
  )
}
