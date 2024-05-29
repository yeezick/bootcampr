import {
  updatePaymentExperience,
  updateUser,
  updateUserProfile,
} from 'utils/api'
import { errorSnackbar } from './commentHelpers'
import {
  updateAuthUser,
  updateUserExperience,
} from 'utils/redux/slices/userSlice'

export const handleJoinTeam = async (dispatch, navigate, userId) => {
  const updatedExperience = await updatePaymentExperience(userId, {
    experience: 'waitlist',
  })
  if (updatedExperience.error) {
    dispatch(errorSnackbar('Error setting project experience.'))
    return
  }
  dispatch(updateUserExperience(updatedExperience))
  navigate('/onboarding')
}

export const handleJoinDiscord = () => {
  window.open('https://discord.gg/JJGBf9SX6y', '_blank')
}

export const handleJoinNewTeam = async (dispatch, navigate, userId) => {
  await updatePaymentExperience(userId, {
    experience: 'waitlist',
    paid: false,
  })

  await updateUser(userId, {
    onboarded: false,
  })
  dispatch(
    updateUserExperience({
      experience: 'waitlist',
      paid: false,
    })
  )
  dispatch(updateAuthUser({ onboarded: false }))
  navigate('/onboarding')
}
