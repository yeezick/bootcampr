import { useMemo } from 'react'
import { TeamAvatarProps } from 'interfaces/ProfileImageInterfaces'
import './TeamAvatar.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUsersById } from 'utils/redux/slices/projectSlice'

export const TeamAvatar = ({ userId, size }: TeamAvatarProps) => {
  //Each time TeamAvatar recieves a new userId prop, even if the actual userId value hasn't changed, it's treated as a new instance
  const memoizedUserId = useMemo(() => selectUsersById([userId]), [userId])
  const [user] = useAppSelector(memoizedUserId)

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
    const defaultImageURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

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
