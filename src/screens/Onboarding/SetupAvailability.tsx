import { useState } from 'react'
import {
  Availability,
  saveAvailability,
} from 'components/Availability/Availability'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './SetupAvailability.scss'

interface SetupAvailabilityProps {
  handlePageNavigation: (navType: 'previous' | 'next' | 'specific') => void
}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  handlePageNavigation,
}) => {
  const [days, setDays] = useState(defaultAvailability)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const handleSaveAvailability = async () => {
    await saveAvailability(dispatch, authUser._id, days)
    handlePageNavigation('next')
  }

  const handleBack = () => handlePageNavigation('previous')

  return (
    <div className='setup-avail-page'>
      <div className='setup-avail-header'>
        <h2>When are you available for meetings?</h2>
        <p>
          We will match project teams according to availability to meet. You can
          edit this later in the project portal calendar page.
        </p>
        <i>Select at least one day per week with a block of time.</i>
      </div>

      <Availability days={days} setDays={setDays} />

      <div className='setup-avail-buttons-wrapper'>
        <div className='setup-avail-buttons'>
          <SecondaryButton handler={handleBack} text='Role' />
          <CTAButton handler={handleSaveAvailability} text='Set up profile' />
        </div>
      </div>
    </div>
  )
}

export const CTAButton = ({ handler, text }) => {
  //Todo: Turn colors into SCSS vars
  //Todo: Forward icons should either be props or an abstraction of this component
  return (
    <Button
      sx={{
        backgroundColor: '#FFA726',
        color: '#1A237E',
        marginLeft: '8px',
        textTransform: 'none',
      }}
      onClick={handler}
      variant='contained'
    >
      {text}
      <ArrowForwardIcon sx={{ marginLeft: '8px' }} />
    </Button>
  )
}

export const SecondaryButton = ({ handler, text }) => {
  return (
    <Button
      onClick={handler}
      sx={{
        borderColor: '#5C6BC0',
        color: '#1A237E',
        marginRight: '8px',
        textTransform: 'none',
      }}
      variant='outlined'
    >
      <ArrowBackIcon sx={{ marginRight: '8px' }} />
      {text}
    </Button>
  )
}
