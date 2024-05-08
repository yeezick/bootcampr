import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import {
  createCheckout,
  updatePaymentExperience,
  updateUser,
  updateUserProfile,
} from 'utils/api'
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
  const handleSecondaryClick = async e => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      handlePageNavigation('previous')
    } catch (error) {
      dispatch(errorSnackbar('Profile failed to save. Please try again.'))
    }
  }

  const handlePrimaryClick = async () => {
    try {
      await updateUserProfile(updateUserForm)
    } catch (err) {
      dispatch(errorSnackbar('Profile failed to save. Please try again.'))
    }

    const checkoutResponse = await createCheckout()
    if (checkoutResponse.error && !checkoutResponse.checkoutUrl) {
      dispatch(errorSnackbar(checkoutResponse.error))
      return
    }

    const updatedUserExperience = await updatePaymentExperience(authUser._id, {
      experience: 'waitlist',
    })

    if (updatedUserExperience.error) {
      dispatch(errorSnackbar('Error setting project experience.'))
      return
    } else {
      dispatch(updateUserExperience(updatedUserExperience))
      window.location.href = checkoutResponse.checkoutUrl
    }
  }
  return (
    <div className='setupProfile__profile-btns'>
      <div className='setupProfile__cta-container'>
        <PaginatorButton
          buttonType='secondary'
          text='Availability'
          handler={handleSecondaryClick}
          disabled={disabledBtn}
        />
        <div className='complete-payment'>
          <PaginatorButton
            buttonType='primary'
            text='Complete payment'
            handler={handlePrimaryClick}
            disabled={disabledBtn}
          />
          <p className='payment-disclaimer'>
            *You will be directed to a third-party payment processor. It is
            secure.
          </p>
        </div>
      </div>
    </div>
  )
}
