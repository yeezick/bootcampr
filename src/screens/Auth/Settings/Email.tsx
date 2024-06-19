import './Settings.scss'
import { useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { PrimaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { updateEmailAddress } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const Email = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [newEmail, setNewEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const currentUserEmail = authUser.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const refreshForm = () => {
    setNewEmail('')
    setIsDisabled(true)
    setErrorMessage('')
  }

  const handleEmailChange = e => {
    const { value } = e.target
    setNewEmail(value)
    setErrorMessage('')
    if (value.trim() && emailRegex.test(value) && errorMessage === '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    if (!value) {
      refreshForm()
    }
  }

  const validateEmail = () => {
    if (newEmail === currentUserEmail) {
      setErrorMessage('New email cannot be the same as current email')
      return false
    } else if (newEmail.length > 0 && !emailRegex.test(newEmail)) {
      setErrorMessage('Invalid email address')
      return false
    }
    setErrorMessage('')
    return true
  }

  const handleUpdateNewEmail = async () => {
    if (!validateEmail()) {
      setIsDisabled(true)
      return
    }

    setIsLoading(true)
    const response = await updateEmailAddress(newEmail, authUser._id)

    if (response.status === 201) {
      const encodedEmail = btoa(newEmail)
      navigate(
        `/users/${authUser._id}/update-email-confirmation?${encodedEmail}`
      )
    } else {
      dispatch(errorSnackbar('There was an error updating your email'))
    }
    setIsLoading(false)
  }

  return (
    <div className='settings-card'>
      <h3>Update email address</h3>
      <h4>Current email address</h4>
      <p>{currentUserEmail}</p>
      <label htmlFor='newEmail'>Enter updated email address</label>

      <div className='email-input-container'>
        <input
          type='text'
          id='newEmail'
          value={newEmail}
          onChange={handleEmailChange}
          onBlur={validateEmail}
          placeholder='email@email.com'
          className={errorMessage === '' ? '' : 'invalid-email'}
        />
        <p className='invalid-msg'>{errorMessage}</p>
      </div>
      <ButtonContainer style={{ marginTop: '32px' }}>
        <PrimaryButton
          loading={isLoading}
          disabled={isDisabled}
          onClick={handleUpdateNewEmail}
          label='Update email address'
        />
      </ButtonContainer>
    </div>
  )
}
