import axios from 'axios'

/**
 * Sends the cropped image to the server.
 * @param {File} profileImageFile - The cropped image file to be uploaded.
 * @param {string} userId - The user ID to associate with the uploaded image.
 * @returns {Promise} - Axios response after successfully uploading the image.
 */
export const createUserImage: any = async (
  profileImageFile: File,
  userId: string
) => {
  const addImage = new FormData()
  addImage.append('image', profileImageFile)
  addImage.append('userId', userId)
  return await axios.post(
    `${process.env.REACT_APP_LOCAL_URL}users/${userId}/addImage`,
    addImage,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
}

/**
 * Converts the cropped image URL to a File object.
 * @param {string} croppedImageURL - The URL of the cropped image.
 * @returns {Promise<File>} - A Promise that resolves to a File object.
 */
export const saveCroppedImage = async (
  croppedImageURL: string
): Promise<File> => {
  const response = await fetch(croppedImageURL)
  const blob = await response.blob()
  console.log('Cropped Image Blob:', blob)
  const croppedImageFile = new File([blob], 'croppedImage.jpg', {
    type: 'image/jpeg',
  })
  return croppedImageFile
}
