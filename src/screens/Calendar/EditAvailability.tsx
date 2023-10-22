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
  UTCtoBootcamprTimezoneMap,
  bootcamprTimezoneToUTCMap,
} from 'utils/data/timeZoneConstants'
import { guessUserTimezone } from 'utils/helpers/availabilityHelpers'

export const EditAvailability = () => {
  // Here the timezone should get whatever the user has saved already (the onboarding screen will guess)
  // Currently even if the user saves a new timezone, its returning then to ET?
  // At this point the user should definitely have a timezone saved - can we assume that route?
  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [userTimezone, setUserTimezone] = useState(Timezones.ET)

  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const timezone = useAppSelector(getUserTimezone)

  const handleSaveAvailability = async () => {
    const userTimezoneInUTC = bootcamprTimezoneToUTCMap[userTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTimezoneInUTC)
  }

  useEffect(() =>
    // we need a uniform function that checks if tz exists yet, then guesses if not or something like that
    {
      // this is the timezone got from redux in UTC format
      console.log(timezone)
      // this converst that utc format timezone to the BC defined user friendly string options
      console.log(UTCtoBootcamprTimezoneMap[timezone])
      guessUserTimezone()
    }, [])

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
