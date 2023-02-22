import React from 'react'
type PreviewUserImageInterface = {
  previewImage?: string
  authUser: { profilePicture: string }
}
const PreviewUserImage = ({
  previewImage,
  authUser,
}: PreviewUserImageInterface) => {
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

export default PreviewUserImage
