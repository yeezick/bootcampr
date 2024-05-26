import './Settings.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { api } from 'utils/api/apiConfig'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import { PrimaryButton } from 'components/Buttons'
import { ButtonContainer } from 'components/Buttons/ButtonContainer'
import { updateEmailAddress } from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'

export const Email = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [newEmail, setNewEmail] = useState('')
  const [isDisabled, toggleIsDisabled] = useState(true)
  const [isValidEmail, setValidEmail] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentUserEmail = authUser.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const refreshForm = () => {
    setNewEmail('')
    toggleIsDisabled(true)
    setValidEmail(true)
  }

  const handleEmailChange = e => {
    const { value } = e.target
    setNewEmail(value)
    setValidEmail(emailRegex.test(value))
    if (!value) {
      refreshForm()
    }
  }

  const handleUpdateNewEmail = async () => {
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

  useEffect(() => {
    if (newEmail.trim().length > 0 && isValidEmail) {
      toggleIsDisabled(false)
    } else {
      toggleIsDisabled(true)
    }
  }, [newEmail])

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
          placeholder='email@email.com'
          className={isValidEmail ? '' : 'invalid-email'}
        />
        {!isValidEmail && <p className='invalid-msg'>Invalid email address</p>}
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
