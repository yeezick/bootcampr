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

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const userTimezoneInUTC = useAppSelector(getUserTimezone)

  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const [uxUserTimezone, setUxUserTimezone] = useState(Timezones.ET)

  const handleSaveAvailability = async () => {
    const userTimezoneInUTC = bootcamprTimezoneToUTCMap[uxUserTimezone]
    await saveAvailability(dispatch, authUser._id, days, userTimezoneInUTC)
  }

  useEffect(() => {
    const userFriendlyTimezone = utcToBootcamprTimezoneMap[userTimezoneInUTC]
    setUxUserTimezone(userFriendlyTimezone)
  }, [])

  return (
    <div className='edit-availability-container'>
      <Availability
        days={days}
        setDays={setDays}
        uxUserTimezone={uxUserTimezone}
        setUxUserTimezone={setUxUserTimezone}
      />
      <div className='edit-availability-btn-group'>
        <PrimaryButton handler={handleSaveAvailability} text='Save' />
      </div>
    </div>
  )
}
