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
  utcToBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'

interface SetupAvailabilityProps {
  handlePageNavigation: (navType: 'previous' | 'next' | 'specific') => void
}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({
  handlePageNavigation,
}) => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const storedUserTZinUTC = useAppSelector(getUserTimezone)

  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [uxUserTimezone, setUxUserTimezone] = useState(Timezones.ET)

  const handleBack = () => handlePageNavigation('previous')
  const handleSaveAvailability = async () => {
    const userTZinUTC = bootcamprTimezoneToUTCMap[uxUserTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTZinUTC)
    handlePageNavigation('next')
  }

  useEffect(() => {
    let userFriendlyTZ = Timezones.ET
    if (storedUserTZinUTC) {
      userFriendlyTZ = utcToBootcamprTimezoneMap[storedUserTZinUTC]
    } else {
      const userTZguess = guessUserTimezone()
      userFriendlyTZ = userTZguess.userFriendlyTZ
    }
    setUxUserTimezone(userFriendlyTZ)
  }, [])

  return (
    <div className='setup-avail-page'>
      <div className='setup-avail-header'>
        <h2>When are you available for meetings?</h2>
        <p>We will match project teams according to availability to meet.</p>
        <p>You can edit this later in the project portal calendar page.</p>
        <i>Select at least one day per week with a block of time.</i>
      </div>

      <Availability
        days={days}
        setDays={setDays}
        uxUserTimezone={uxUserTimezone}
        setUxUserTimezone={setUxUserTimezone}
      />

      <div className='setup-avail-buttons-wrapper'>
        <div className='setup-avail-buttons'>
          <SecondaryButton
            handler={handleBack}
            text='Role'
            paginatorBtn={true}
          />
          <PrimaryButton
            handler={handleSaveAvailability}
            text='Set up profile'
            paginatorBtn={true}
          />
        </div>
      </div>
    </div>
  )
}
