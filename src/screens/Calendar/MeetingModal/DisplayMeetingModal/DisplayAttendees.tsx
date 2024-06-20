import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectMembersByEmail } from 'utils/redux/slices/projectSlice'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import { selectDisplayedEvent } from 'utils/redux/slices/calendarSlice'
import { useNavigate } from 'react-router-dom'
import { generateDefaultPicture } from 'utils/helpers'

export const DisplayAttendees = () => {
  const [invitedMembers, setInvitedMembers] = useState([])
  const { attendees, organizer } = useAppSelector(selectDisplayedEvent)
  const emailQueries = attendees.map(attendee => attendee.email)
  const teamMembers = useAppSelector(selectMembersByEmail(emailQueries))

  useEffect(() => {
    const prepareInvitedMembers = () => {
      if (attendees.length) {
        const invitedMemberInfo = []
        for (const member of teamMembers) {
          const { firstName, lastName, profilePicture, role, email, _id } =
            member
          invitedMemberInfo.push({
            firstName,
            profilePicture,
            lastName,
            role,
            email,
            userId: _id,
            organizer: organizer === email ? true : false,
          })
        }
        const organizerIndex = invitedMemberInfo.findIndex(
          member => member.organizer === true
        )
        invitedMemberInfo.push(...invitedMemberInfo.splice(0, organizerIndex))
        setInvitedMembers(invitedMemberInfo)
      }
    }
    prepareInvitedMembers()
  }, [])

  return (
    <>
      <GroupsOutlinedIcon className='people-icon centered-icon' />
      <div className='invited-members modal-section'>
        {invitedMembers.map(member => (
          <InvitedMember member={member} />
        ))}
      </div>
    </>
  )
}

const InvitedMember = ({ member }) => {
  const navigate = useNavigate()
  const memberName = `${member.firstName} ${member.lastName}`
  const userProfilePicture =
    member.profilePicture ||
    generateDefaultPicture(member.firstName, member.lastName)

  return (
    <div className='invited-member' key={`${memberName}`}>
      <img className='member-photo' src={userProfilePicture} alt='member-pic' />
      <div className='member-info'>
        <p onClick={() => navigate(`/users/${member.userId}`)}>{memberName}</p>
        <p className='role'>{member.role}</p>
      </div>
      {member.organizer && <p className='organizer'>Organizer</p>}
    </div>
  )
}
