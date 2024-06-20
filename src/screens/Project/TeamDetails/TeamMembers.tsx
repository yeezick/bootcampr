import { useAppSelector } from 'utils/redux/hooks'
import { selectMembersByRole } from 'utils/redux/slices/projectSlice'
import { TeamMemberCard } from './TeamMemberCard'
import './TeamMembers.scss'

export const TeamMembers = () => {
  const teamMembers = useAppSelector(selectMembersByRole)

  return (
    <div className='team-members'>
      <div className='team-members-info'>
        {Object.entries(teamMembers)?.map(([role, members]) => (
          <RoleMembers
            roleMembers={members}
            role={role}
            key={`role-column-${role}`}
          />
        ))}
      </div>
    </div>
  )
}

const RoleMembers = ({ roleMembers, role }) => {
  let roleHeader
  let roleClassName

  switch (role) {
    case 'engineers':
      roleHeader = 'Software Engineers'
      roleClassName = 'swe'
      break
    case 'designers':
      roleHeader = 'UX Designers'
      roleClassName = 'uxd'
      break
    case 'productManagers':
      roleHeader = 'Product Manager'
      roleClassName = 'pm'
      break
    default:
      break
  }

  return (
    <div className='role-column' key={`role-column-${roleClassName}`}>
      <div className={`role-header`}>
        <h3>{roleHeader}</h3>
      </div>
      {roleMembers?.map(member => (
        <TeamMemberCard
          member={member}
          roleHeader={roleHeader}
          key={`${roleClassName}-${member._id}`}
        />
      ))}
    </div>
  )
}
