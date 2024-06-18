import { useMemo } from 'react'
import { TeamAvatarProps } from 'interfaces/ProfileImageInterfaces'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'
import { generateDefaultPicture } from 'utils/helpers'
import './TeamAvatar.scss'
import { selectUserById } from 'utils/redux/slices/teamMembersSlice'

export const TeamAvatar = ({ userId, size }: TeamAvatarProps) => {
  //Each time TeamAvatar recieves a new userId prop, even if the actual userId value hasn't changed, it's treated as a new instance
  let user
  //Do we need this memoized selector here? for now, I'm keeping this for sandbox team but it can be handled differently if we don't need this for any other reason
  const memoizedUserId = useMemo(() => selectUsersById([userId]), [userId])
  const [teamMember] = useAppSelector(memoizedUserId)
  user = useAppSelector(selectUserById(userId))

  user = user || teamMember
  if (!user) {
    return (
      <div className='team-avatar'>
        <div className='ta-profile-pics'>
          <img
            className={`ta-imgs ${size || ''}`}
            src='/default_profile.png'
            alt='unassigned-thumbnail'
          />
        </div>
      </div>
    )
  } else {
    const { firstName, lastName, profilePicture } = user
    const defaultImageURL = generateDefaultPicture(firstName, lastName)

    return (
      <div className='team-avatar'>
        {profilePicture ? (
          <div className='ta-profile-pics'>
            <img
              className={`ta-imgs ${size || ''}`}
              src={profilePicture}
              alt='team avatar pics'
            />
          </div>
        ) : (
          <div className='ta-default-pics'>
            <img
              className={`ta-imgs ${size || ''}`}
              src={defaultImageURL}
              alt='team avatar default'
            />
          </div>
        )}
      </div>
    )
  }
}
