import { useState } from 'react'
import { BackButton, ForwardButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { createCheckout, updatePaymentExperience, updateUser } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  setAuthUser,
  updateUserExperience,
} from 'utils/redux/slices/userSlice'

export const SetupProfileBtns = ({
  disabledBtn,
  handlePageNavigation,
  updateUserForm,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const dispatch = useAppDispatch()
  const [primaryIsLoading, setPrimaryIsLoading] = useState<boolean>(false)
  const [secondaryIsLoading, setSecondaryIsLoading] = useState<boolean>(false)

  const handleSecondaryClick = async e => {
    e.preventDefault()
    setSecondaryIsLoading(true)

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      handlePageNavigation('previous')
    } catch (error) {
      dispatch(errorSnackbar('Profile failed to save. Please try again.'))
    } finally {
      setSecondaryIsLoading(false)
    }
  }

  const handlePrimaryClick = async e => {
    setPrimaryIsLoading(true)

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))

      const checkoutResponse = await createCheckout()
      if (checkoutResponse.error && !checkoutResponse.checkoutUrl) {
        dispatch(errorSnackbar(checkoutResponse.error))
        return
      }

      const userExperience =
        authUser.projects.projects.length === 0 ? 'waitlist' : 'recurring'
      const updatedUserExperience = await updatePaymentExperience(
        authUser._id,
        {
          experience: userExperience,
        }
      )

      if (updatedUserExperience.error) {
        dispatch(errorSnackbar('Error setting project experience.'))
        return
      } else {
        dispatch(updateUserExperience(updatedUserExperience))
        window.location.href = checkoutResponse.checkoutUrl
      }
    } catch (err) {
      dispatch(errorSnackbar('Profile failed to save. Please try again.'))
    } finally {
      setPrimaryIsLoading(false)
    }
  }
  return (
    <ButtonContainer
      style={{ marginTop: '32px', position: 'relative' }}
      gap={32}
    >
      <BackButton
        loading={secondaryIsLoading}
        label='Availability'
        onClick={handleSecondaryClick}
      />
      <div className='setupProfile__cta-and-disclaimer'>
        <ForwardButton
          loading={primaryIsLoading}
          label='Complete payment'
          onClick={handlePrimaryClick}
          disabled={disabledBtn}
        />
        <p>
          *You will be directed to a third-party payment processor. It is
          secure.
        </p>
      </div>
    </ButtonContainer>
  )
}
