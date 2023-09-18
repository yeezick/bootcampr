import { useState } from 'react'
import { Availability } from 'components/Availability/Availability'
import { saveAvailability } from 'components/Availability/utils/helpers'
import { PrimaryButton } from 'components/Buttons'
import { AvailabilityInterface } from 'interfaces'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './EditAvailability.scss'

export const EditAvailability = () => {
  const [days, setDays] = useState<AvailabilityInterface>(defaultAvailability)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const handleSaveAvailability = async () =>
    await saveAvailability(dispatch, authUser._id, days)

  return (
    <div>
      <Availability days={days} setDays={setDays} />
      <div className='edit-availability-btn-group'>
        <PrimaryButton handler={handleSaveAvailability} text='Save' />
      </div>
    </div>
  )
}
