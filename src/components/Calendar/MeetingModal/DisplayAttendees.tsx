import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectMembersByEmail } from 'utils/redux/slices/projectSlice'

export const DisplayAttendees = ({ attendees }) => {
  const emailQueries = attendees.map(attendee => attendee.email)
  const [invitedMembers, setInvitedMembers] = useState([])
  const teamMembers = useAppSelector(selectMembersByEmail(emailQueries))

  useEffect(() => {
    const prepareInvitedMembers = () => {
      if (attendees.length) {
        const invitedMemberInfo = []
        for (const member of teamMembers) {
          const { firstName, lastName, profilePicture } = member
          invitedMemberInfo.push({
            firstName: firstName,
            profilePicture: profilePicture,
            lastName: lastName,
          })
        }
        setInvitedMembers(invitedMemberInfo)
      }
    }
    prepareInvitedMembers()
  }, [])

  return (
    <div className='invited-members'>
      {invitedMembers.map(member => (
        <InvitedMember member={member} />
      ))}
    </div>
  )
}

const InvitedMember = ({ member }) => {
  const memberName = `${member.firstName} ${member.lastName}`
  return (
    <div className='invited-member' key={`${memberName}`}>
      <img className='member-photo' src={member.profilePicture} />
      <p>{memberName}</p>
    </div>
  )
}
