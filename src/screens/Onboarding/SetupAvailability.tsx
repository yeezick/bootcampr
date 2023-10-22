import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone, selectAuthUser } from 'utils/redux/slices/userSlice'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { AvailabilityInterface } from 'interfaces'
import { saveAvailability } from 'components/Availability/utils/helpers'
import './SetupAvailability.scss'
import { Timezones } from 'components/Availability/utils/data'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'
import {
  UTCtoBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'

interface SetupAvailabilityProps {
  handlePageNavigation: (navType: 'previous' | 'next' | 'specific') => void
}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  handlePageNavigation,
}) => {
  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [userTimezone, setUserTimezone] = useState(Timezones.ET)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const handleBack = () => handlePageNavigation('previous')
  const storedUserTZ = useAppSelector(getUserTimezone)

  const handleSaveAvailability = async () => {
    const userTZinUTC = bootcamprTimezoneToUTCMap[userTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTZinUTC)
    handlePageNavigation('next')
  }

  useEffect(() => {
    let userFriendlyTZ = Timezones.ET
    // first check if user has tz stored
    if (storedUserTZ) {
      console.log('user has timezone stored')
      console.log(storedUserTZ)
      userFriendlyTZ = UTCtoBootcamprTimezoneMap[storedUserTZ]
      // setUserTimezone(userFriendlyTZ)
    } else {
      console.log('user does not have timezone stored')
      const userTZguess = guessUserTimezone()
      userFriendlyTZ = userTZguess.userFriendlyTZ
      const utc = userTZguess.utc
      console.log(utc)
    }
    setUserTimezone(userFriendlyTZ)
  }, [])

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

      <Availability
        days={days}
        setDays={setDays}
        userTimezone={userTimezone}
        setUserTimezone={setUserTimezone}
      />

      <div className='setup-avail-buttons-wrapper'>
        <div className='setup-avail-buttons'>
          <SecondaryButton handler={handleBack} text='Role' />
          <PrimaryButton
            handler={handleSaveAvailability}
            text='Set up profile'
          />
        </div>
      </div>
    </div>
  )
}
