import { FormControlLabel, Switch, SwitchProps, styled } from '@mui/material'
import { RiGoogleLine } from 'react-icons/ri'

export const GoogleMeetsToggler = ({ googleMeeting, toggleGoogleMeeting }) => {
  const handleMeetToggler = () => {
    toggleGoogleMeeting(!googleMeeting)
  }

  return (
    <>
      <RiGoogleLine className='google-meet-icon' size={23} />
      <div className='google-meet-toggler'>
        <FormControlLabel
          control={
            <IOSSwitch
              sx={{ m: 1, marginLeft: '16px' }}
              checked={googleMeeting}
              onChange={handleMeetToggler}
            />
          }
          label='Google Meet'
          labelPlacement='start'
          sx={{ margin: 0 }}
        />
        <p className='google-meet-text'>
          Google Meet invite will be sent to invitees.
        </p>
      </div>
    </>
  )
}

// Taken directly from MUI docs & modified to fit figma
const IOSSwitch = styled((props: SwitchProps) => <Switch {...props} />)(() => ({
  overflow: 'visible',
  width: 32,
  height: 16,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#5C6BC0',
        opacity: 1,
        border: '0.5px solid #5C6BC0',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    boxSizing: 'border-box',
    border: '0.5px solid #5C6BC0',
    marginTop: 0.5,
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    border: '0.5px solid #5C6BC0',
    borderRadius: 13,
    backgroundColor: '#fff',
    opacity: 1,
  },
}))
