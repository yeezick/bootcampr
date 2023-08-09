import React, { useEffect, useState } from 'react'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import './Settings.scss'

export default function Email() {
  const authUser = useAppSelector(selectAuthUser)
  // SWAP to update with current user email
  const [currentEmail, setCurrentEmail] = useState('testemail@mail.com')
  const [newEmail, setNewEmail] = useState('')
  const [reEnterNewEmail, setReEnterNewEmail] = useState('')
  const [emailMatch, setEmailMatch] = useState(false)
  const [nonEmpty, setNonEmpty] = useState(false)

  const refreshForm = () => {
    setNewEmail('')
    setReEnterNewEmail('')
  }

  const checkIfEmailsMatch = () => {
    const validation = newEmail === reEnterNewEmail
    setEmailMatch(validation)
  }

  useEffect(() => {
    setNonEmpty(newEmail.length > 1 && reEnterNewEmail.length > 1)
    console.log(newEmail)
    console.log(reEnterNewEmail)
    checkIfEmailsMatch()
  }, [newEmail, reEnterNewEmail])

  return (
    <div className='settings-card'>
      <h4>Current email address</h4>
      <p>{currentEmail}</p>
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
        <button className='update'>Update email address</button>
      </div>
    </div>
  )
}
