import { EditNote, Link } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers'

export const MeetingTextField = ({ label, name, setMeetingText, value }) => {
  const handleMeetingTextField = e => handleFormInputChange(e, setMeetingText)

  let MeetingTextIcon = null
  if (name === 'description') {
    MeetingTextIcon = EditNote
  } else if (name === 'meetingLink') {
    MeetingTextIcon = Link
  }

  return (
    <div className='meeting-text-field'>
      {MeetingTextIcon && (
        <MeetingTextIcon
          sx={{ alignSelf: 'flex-end', padding: '5px 10px 5px 0px' }}
        />
      )}
      <TextField
        label={label}
        InputLabelProps={{ sx: { fontSize: '14px' } }}
        name={name}
        fullWidth
        onChange={handleMeetingTextField}
        required={name !== 'description' && true}
        sx={{
          '& .MuiInputLabel-asterisk': {
            color: 'orange',
          },
        }}
        value={value}
        variant='standard'
      />
    </div>
  )
}
