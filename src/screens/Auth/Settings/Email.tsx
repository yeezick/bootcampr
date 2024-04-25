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

export const Email = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [newEmail, setNewEmail] = useState('')
  const [reEnterNewEmail, setReEnterNewEmail] = useState('')
  const [emailMatch, setEmailMatch] = useState(false)
  const [nonEmpty, setNonEmpty] = useState(false)
  const [isDisabled, toggleIsDisabled] = useState(true)
  const [isValidEmail, setValidEmail] = useState(true)
  const currentUserEmail = authUser.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const refreshForm = () => {
    setNewEmail('')
    setReEnterNewEmail('')
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

  const checkIfEmailsMatch = () => {
    const validation = newEmail === reEnterNewEmail
    setEmailMatch(validation)
    return validation
  }

  const handleUpdateNewEmail = async () => {
    if (isDisabled) {
      return
    }
    const response = await updateEmailAddress(
      currentUserEmail,
      newEmail,
      authUser,
      navigate
    )
    const severity = response.status >= 400 ? 'error' : 'success'
    const backUpMessage = severity === 'error' ? 'Unexpected Error' : 'Success'
    dispatch(
      createSnackBar({
        message: response.data.friendlyMessage || backUpMessage,
        severity,
      })
    )
  }

  useEffect(() => {
    setNonEmpty(newEmail.length > 1 && reEnterNewEmail.length > 1)
    if (newEmail.length > 0 && isValidEmail) {
      toggleIsDisabled(false)
    } else {
      toggleIsDisabled(true)
    }
  }, [newEmail, reEnterNewEmail, isDisabled])

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
      <ButtonContainer>
        <PrimaryButton
          disabled={isDisabled}
          onClick={handleUpdateNewEmail}
          label='Update email address'
        />
      </ButtonContainer>
    </div>
  )
}

export const updateEmailAddress = async (
  currentUserEmail,
  newEmail,
  authUser,
  navigate
) => {
  const reqBody = {
    userId: authUser._id,
    oldEmail: currentUserEmail,
    newEmail: newEmail,
  }
  const response = await api.post(
    `/users/${authUser._id}/update-email-verification`,
    reqBody
  )
  // only redirect to info page if above response is successful
  if (response.status === 201) {
    const encodedEmail = btoa(newEmail)
    navigate(`/users/${authUser._id}/update-email-confirmation?${encodedEmail}`)
  }

  return response
}
