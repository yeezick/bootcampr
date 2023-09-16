import { useState } from 'react'
import {
  Availability,
  saveAvailability,
} from 'components/Availability/Availability'
import { defaultAvailability } from 'utils/data/userConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'

interface SetupAvailabilityProps {}

export const SetupAvailability: React.FC<SetupAvailabilityProps> = ({}) => {
  const [days, setDays] = useState(defaultAvailability)
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()

  const handleSaveAvailability = async () =>
    await saveAvailability(dispatch, authUser._id, days)

  return (
    <div>
      <Availability days={days} setDays={setDays} />
      <button onClick={handleSaveAvailability}>save</button>
    </div>
  )
}
