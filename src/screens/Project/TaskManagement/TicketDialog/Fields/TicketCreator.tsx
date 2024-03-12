import { useEffect, useState, useMemo } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { selectTicketFields } from 'utils/redux/slices/taskBoardSlice'
import { TicketTextLabel } from './TicketTextFields'
import { TeamAvatar } from 'components/TeamAvatar/TeamAvatar'

export const TicketCreator = () => {
  const { createdBy } = useAppSelector(selectTicketFields)
  const memoizedCreatedBy = useMemo(
    () => selectUsersById([createdBy]),
    [createdBy]
  )
  const [user] = useAppSelector(memoizedCreatedBy)
  const [creator, setCreator] = useState({
    userId: 'Unassigned',
    firstName: '',
    lastName: '',
    role: '',
  })
  const { firstName, lastName, role, userId } = creator

  useEffect(() => {
    if (user) {
      const { firstName, lastName, role, _id: userId } = user
      setCreator({ firstName, lastName, role, userId })
    }
  }, [])

  return (
    <div>
      <TicketTextLabel icon='person' label='Created by' />
      <div className='ticket-creator'>
        <TeamAvatar userId={userId} size='medium' />
        <div className='creator-info'>
          <p className='name'>{`${firstName} ${lastName}`}</p>
          <p className='role'>{role}</p>
        </div>
      </div>
    </div>
  )
}
