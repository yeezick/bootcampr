import React from 'react'
import { TeamAvatarProps } from 'interfaces/ProfileImageInterfaces'
import './TeamAvatar.scss'
import { useAppSelector } from 'utils/redux/hooks'
import { selectMembersById } from 'utils/redux/slices/projectSlice'

export const TeamAvatar = ({ userId, size }: TeamAvatarProps) => {
  const [{ firstName, lastName, profilePicture }] = useAppSelector(
    selectMembersById([userId])
  )
  const defaultImageURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

  return (
    <>
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
            <img src={defaultImageURL} alt='team avatar default' />
          </div>
        )}
      </div>
    </>
  )
}
