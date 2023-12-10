import React from 'react'
import { TeamAvatarProps } from 'interfaces/ProfileImageInterfaces'
import './TeamAvatar.scss'

export const TeamAvatar: React.FC<TeamAvatarProps> = ({ userProfileInfo }) => {
  const { firstName, lastName, hasProfilePicture, profilePicture } =
    userProfileInfo

  const defaultImageURL = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

  return (
    <>
      <div className='team_avatar'>
        {hasProfilePicture ? (
          <div className='ta_profile_pics'>
            <img
              className='ta_imgs'
              src={profilePicture}
              alt='team avatar pics'
            />
          </div>
        ) : (
          <div className='ta_default_pics'>
            <img src={defaultImageURL} alt='team avatar default' />
          </div>
        )}
      </div>
    </>
  )
}
