import { api } from './apiConfig'

export const updateUserImage = async (userId, imageFile) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('image', imageFile)

  try {
    const res = await api.post(`/users/${userId}/addImage`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  } catch (err) {
    console.log('Error updating user image:', err)
    throw err
  }
}

export const deleteUserImage = async userId => {
  try {
    const res = await api.delete(`/users/${userId}/deleteImage`)
    return res.data
  } catch (err) {
    console.log('Error deleting user image:', err)
    throw err
  }
}

// Modify verison for Blob handling, might not be needed
// import { api } from './apiConfig'

// export const updateUserImage = async (userId, imageBase64) => {
//   // Split the base64 string
//   const splitImage = imageBase64.split(',');

//   // Get the MIME type of the image
//   const imageType = splitImage[0].split(':')[1].split(';')[0];

//   // Create a blob from the base64 string
//   let response = await fetch(imageBase64);
//   let imageBlob = await response.blob();

//   const formData = new FormData();
//   formData.append('userId', userId);
//   formData.append('image', imageBlob, `${userId}.jpeg`); // Give the image a name

//   for (let pair of formData.entries()) {
//     console.log('FormData:', pair[0] + ', ' + pair[1]); // log the FormData
//   }
//   console.log('imageType', imageType); // log the MIME type

//   try {
//     const res = await api.post(`/users/${userId}/addImage`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return res.data;
//   } catch (err) {
//     console.log('Error updating user image:', err);
//     throw err;
//   }
// };

// export const deleteUserImage = async userId => {
//   try {
//     const res = await api.delete(`/users/${userId}/deleteImage`)
//     return res.data
//   } catch (err) {
//     console.log('Error deleting user image:', err)
//     throw err
//   }
// }
