import React, { useEffect } from 'react'
import { TeamAvatarProps } from 'interfaces/ProfileImageInterfaces'
import './TeamAvatar.scss'

export const TeamAvatar: React.FC<TeamAvatarProps> = ({ userProfileInfo }) => {
  const { firstName, lastName, hasProfilePicture, profilePicture } =
    userProfileInfo

  const defaultImageURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

  return (
    <>
      <div className='team-avatar'>
        {hasProfilePicture ? (
          <div className='ta-profile-pics'>
            <img
              className='ta-imgs'
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
