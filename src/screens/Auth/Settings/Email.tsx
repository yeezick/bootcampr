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

  useEffect(() => {
    console.log(newEmail)
    console.log(reEnterNewEmail)
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
      <div className='buttons'>
        <button className='cancel'>Cancel</button>
        <button className='update'>Update email address</button>
      </div>
    </div>
  )
}
