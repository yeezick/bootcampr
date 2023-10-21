import { useState } from 'react'
import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { PrimaryButton } from 'components/Buttons'
import { AvailabilityInterface } from 'interfaces'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { Timezones } from 'components/Availability/utils/data'
import { bootcamprTimezoneToUTCMap } from 'utils/data/timeZoneConstants'

export const EditAvailability = () => {
  // Here the timezone should get whatever the user has saved already (the onboarding screen will guess)
  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [userTimezone, setUserTimezone] = useState(Timezones.ET)

  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const handleSaveAvailability = async () => {
    const userTimezoneInUTC = bootcamprTimezoneToUTCMap[userTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTimezoneInUTC)
  }

  return (
    <div>
      <Availability
        days={days}
        setDays={setDays}
        userTimezone={userTimezone}
        setUserTimezone={setUserTimezone}
      />
      <div className='edit-availability-btn-group'>
        <PrimaryButton handler={handleSaveAvailability} text='Save' />
      </div>
    </div>
  )
}
