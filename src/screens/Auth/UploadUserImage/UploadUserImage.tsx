import React from 'react'
type UploadUserImageInterface = {
  previewImage?: string
  authUser: { profilePicture: string }
}
const UploadUserImage = ({
  previewImage,
  authUser,
}: UploadUserImageInterface) => {
  return (
    <div>
      {previewImage ? (
        <div className='profile-photo'>
          <img src={previewImage} alt='photo' />
        </div>
      ) : (
        <div className='profile-photo'>
          <img src={authUser.profilePicture} alt='photo' />
        </div>
      )}
    </div>
  )
}

export default UploadUserImage