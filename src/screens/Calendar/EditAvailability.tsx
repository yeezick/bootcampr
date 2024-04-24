import { useState, useEffect } from 'react'
import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { AvailabilityInterface } from 'interfaces'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getUserTimezone, selectAuthUser } from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'
import { utcToBootcamprTimezoneMap } from 'utils/data/timeZoneConstants'
import { PrimaryButton } from 'components/Buttons'

export const EditAvailability = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const userTimezoneInUTC = useAppSelector(getUserTimezone)

  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)

  const handleSaveAvailability = async () => {
    await saveAvailability(dispatch, authUser._id, days, userTimezoneInUTC)
  }

  useEffect(() => {
    const userFriendlyTimezone = utcToBootcamprTimezoneMap[userTimezoneInUTC]
  }, [])

  return (
    <div className='edit-availability-container'>
      <Availability days={days} setDays={setDays} />
      <div className='edit-availability-btn-group'>
        {' '}
        //TODO match this styling
        <PrimaryButton onClick={handleSaveAvailability} label='Save' />
      </div>
    </div>
  )
}
