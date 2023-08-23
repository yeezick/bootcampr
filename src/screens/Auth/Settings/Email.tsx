import './Settings.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, selectUserEmail } from 'utils/redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { api } from 'utils/api/apiConfig'
import { useDispatch } from 'react-redux'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const Email = () => {
  // if authUser is full user object, second email select is not necessary
  const authUser = useAppSelector(selectAuthUser)
  const currentUserEmail = useSelector(selectUserEmail)
  const [newEmail, setNewEmail] = useState('')
  const [reEnterNewEmail, setReEnterNewEmail] = useState('')
  const [emailMatch, setEmailMatch] = useState(false)
  const [nonEmpty, setNonEmpty] = useState(false)
  // incorporate button disable functionality
  const [isDisabled, toggleIsDisabled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const refreshForm = () => {
    setNewEmail('')
    setReEnterNewEmail('')
    toggleIsDisabled(true)
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
        isOpen: true,
        message: response.data.friendlyMessage || backUpMessage,
        duration: 5000,
        vertical: 'top',
        horizontal: 'center',
        snackbarStyle: '',
        severity,
      })
    )
  }

  useEffect(() => {
    setNonEmpty(newEmail.length > 1 && reEnterNewEmail.length > 1)
    if (checkIfEmailsMatch() && newEmail.length > 0) {
      toggleIsDisabled(false)
    } else {
      toggleIsDisabled(true)
    }
  }, [newEmail, reEnterNewEmail, isDisabled])

  return (
    <div className='settings-card'>
      <h4>Current email address</h4>
      <p>{currentUserEmail}</p>
      <h4>Enter updated email address (ex. jeanine@bootcampr.io)</h4>
      <input
        type='text'
        value={newEmail}
        onChange={e => setNewEmail(e.target.value)}
      />
      <h4>Re-enter updated email address</h4>
      <input
        type='text'
        value={reEnterNewEmail}
        onChange={e => setReEnterNewEmail(e.target.value)}
      />
      {nonEmpty &&
        (emailMatch ? (
          <p className='valid'>Email addresses match</p>
        ) : (
          <p className='invalid'>Email addresses do not match</p>
        ))}
      <div className='buttons'>
        <button className='cancel' onClick={refreshForm}>
          Cancel
        </button>
        <button
          className='update'
          disabled={isDisabled}
          onClick={handleUpdateNewEmail}
        >
          Update email address
        </button>
      </div>
    </div>
  )
}

export const updateEmailAddress = async (
  currentUserEmail,
  newEmail,
  authUser,
  navigate
) => {
  // const navigate = useNavigate()
  // const authUser = useAppSelector(selectAuthUser)
  // const currentUserEmail = useSelector(selectUserEmail)
  const reqBody = {
    userId: authUser._id,
    oldEmail: currentUserEmail,
    newEmail: newEmail,
  }
  const response = await api.post(
    `/users/${authUser._id}/update-email-verification`,
    reqBody
  )
  console.log(response)
  if (response.status >= 400) {
    console.log(response.data.message)
  }
  // only redirect to info page if above response is successful
  if (response.status === 201) {
    const encodedEmail = btoa(newEmail)
    navigate(`/users/${authUser._id}/update-email-confirmation?${encodedEmail}`)
  }

  return response
  // otherwise user error response from api request to render a toast error message
}
