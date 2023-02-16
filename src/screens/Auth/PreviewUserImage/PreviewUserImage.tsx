import React from 'react'

const PreviewUserImage = ({ previewImage, authUser }: any) => {
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
