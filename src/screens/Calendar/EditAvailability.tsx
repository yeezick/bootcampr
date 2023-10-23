import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { PrimaryButton } from 'components/Buttons'
import { AvailabilityInterface } from 'interfaces'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone, selectAuthUser } from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { Timezones } from 'components/Availability/utils/data'
import {
  utcToBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const timezone = useAppSelector(getUserTimezone)

  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [UXuserTimezone, setUXUserTimezone] = useState(Timezones.ET)

  const handleSaveAvailability = async () => {
    const userTimezoneInUTC = bootcamprTimezoneToUTCMap[UXuserTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTimezoneInUTC)
  }

  useEffect(() => {
    const userFriendlyTimezone = utcToBootcamprTimezoneMap[timezone]
    setUXUserTimezone(userFriendlyTimezone)

    // NOTE: Placeholder to eventually handle when user's stored TZ does not match DayJS identified local TZ for user
    const userTimezoneGuess = guessUserTimezone()
    if (userTimezoneGuess.utc !== timezone) {
      console.log(
        "User's stored timezone does not match detected local timezone"
      )
    } else {
      console.log("User's stored timezone matches our local guess")
    }
  }, [])

  return (
    <div>
      <Availability
        days={days}
        setDays={setDays}
        userTimezone={UXuserTimezone}
        setUserTimezone={setUXUserTimezone}
      />
      <div className='edit-availability-btn-group'>
        <PrimaryButton handler={handleSaveAvailability} text='Save' />
      </div>
    </div>
  )
}
