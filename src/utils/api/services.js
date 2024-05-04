import { api } from './apiConfig'

export const updateUserImage = async (userId, imageFile) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('image', imageFile)

  try {
    const res = await api.post(`/users/${userId}/addImage`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('data', res.data)
    return res.data
  } catch (err) {
    console.error('Error updating user image:', err)
    throw err
  }
}

export const deleteUserImage = async userId => {
  try {
    const res = await api.delete(`/users/${userId}/deleteImage`)
    return res.data
  } catch (err) {
    console.error('Error deleting user image:', err)
    throw err
  }
}
