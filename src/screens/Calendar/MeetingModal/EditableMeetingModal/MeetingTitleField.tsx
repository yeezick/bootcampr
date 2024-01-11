import { TextField } from '@mui/material'

export const MeetingTitleField = ({ handleFormInputChange, meetingText }) => {
  return (
    <div className='title-field'>
      <TextField
        placeholder='Add Title'
        name='summary'
        InputLabelProps={{ className: 'title-input-label' }}
        onChange={handleFormInputChange}
        required
        sx={titleInputFieldStyles}
        value={meetingText.summary}
        variant='standard'
      />
      <span className='required-span'>This field is required</span>
    </div>
  )
}

const titleInputFieldStyles = {
  marginBottom: '5px',

  width: '100%',
  '& .MuiInputBase-input': {
    fontSize: '28px',
    color: '#616161',
    '&:focus': {},
  },
  '& .MuiInputLabel-asterisk': {
    color: 'orange',
  },
  '& .MuiInput-underline': {
    paddingTop: '17px',
  },
}
