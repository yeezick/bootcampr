import { EditNote, Link } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { handleFormInputChange } from 'utils/helpers'

export const MeetingTextField = ({ label, name, setMeetingText, value }) => {
  const handleMeetingTextField = e => handleFormInputChange(e, setMeetingText)

  return (
    <div className='meeting-text-field'>
      {MeetingTextIcon && <MeetingTextIcon name={name} />}
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

const MeetingTextIcon = ({ name }) => {
  switch (name) {
    case 'description':
      return <EditNote sx={meetingTextIconStyles} />
    case 'meetingLink':
      return <Link sx={meetingTextIconStyles} />
    default:
      return null
  }
}

const meetingTextIconStyles = {
  alignSelf: 'flex-end',
  padding: '5px 10px 5px 0px',
}
