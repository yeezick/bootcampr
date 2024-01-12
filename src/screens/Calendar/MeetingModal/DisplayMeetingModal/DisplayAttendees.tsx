import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectMembersByEmail } from 'utils/redux/slices/projectSlice'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'

export const DisplayAttendees = () => {
  const [invitedMembers, setInvitedMembers] = useState([])
  const { attendees } = useAppSelector(selectDisplayedEvent)
  const emailQueries = attendees.map(attendee => attendee.email)
  const teamMembers = useAppSelector(selectMembersByEmail(emailQueries))

  useEffect(() => {
    const prepareInvitedMembers = () => {
      if (attendees.length) {
        const invitedMemberInfo = []
        for (const member of teamMembers) {
          const { firstName, lastName, profilePicture, role } = member
          invitedMemberInfo.push({
            firstName: firstName,
            profilePicture: profilePicture,
            lastName: lastName,
            role: role,
          })
        }
        setInvitedMembers(invitedMemberInfo)
      }
    }
    prepareInvitedMembers()
  }, [])

  return (
    <>
      <GroupsOutlinedIcon className='people-icon centered-icon' />
      <div className='invited-members'>
        {invitedMembers.map(member => (
          <InvitedMember member={member} />
        ))}
      </div>
    </>
  )
}

const InvitedMember = ({ member }) => {
  const memberName = `${member.firstName} ${member.lastName}`
  return (
    <div className='invited-member' key={`${memberName}`}>
      <img className='member-photo' src={member.profilePicture} />
      <div className='member-info'>
        <p>{memberName}</p>
        <p className='role'>{member.role}</p>
      </div>
    </div>
  )
}
