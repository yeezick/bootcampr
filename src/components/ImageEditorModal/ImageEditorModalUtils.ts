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
  const croppedImageFile = new File([blob], 'croppedImage.jpg', {
    type: 'image/jpeg',
  })
  return croppedImageFile
}
