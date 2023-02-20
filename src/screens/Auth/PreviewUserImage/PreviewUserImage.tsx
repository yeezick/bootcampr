import React from 'react'
// type PreviewUserImageInterface = {
//   authUser :
//   previewImage : string
// }
let dia = 'hello'
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
