import { DescriptionOutlined } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers'

export const DescriptionField = ({ label, name, setMeetingText, value }) => {
  const handleDescriptionField = e => handleFormInputChange(e, setMeetingText)

  return (
    <>
      <DescriptionOutlined className='description-icon' name={name} />
      <div className='meeting-text-field'>
        <TextField
          className='description-field'
          placeholder={label}
          InputLabelProps={{ sx: { fontSize: '14px' } }}
          name={name}
          fullWidth
          onChange={handleDescriptionField}
          sx={{
            '& .MuiInputLabel-asterisk': {
              color: 'orange',
            },
          }}
          value={value}
          variant='standard'
        />
      </div>
    </>
  )
}
