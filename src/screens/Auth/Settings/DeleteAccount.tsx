import React from 'react'
import { DeleteAccountModal } from './DeleteAccountModal'
import './Settings.scss'
export const DeleteAccount = ({}) => {
  return (
    <div className='DeleteAccount'>
      <div className='delete-header'>
        <h2>Delete account</h2>
        <h3>Deleting your account cannot be undone.</h3>
        <p>All saved information will be lost.</p>
      </div>
      <div className='joke-div'>
        <p>We're sorry to see you go.</p>
        <p>How do robots say goodbye?</p>
        <p>Bye-nary.</p>
      </div>
      <DeleteAccountModal />
    </div>
  )
}

export default DeleteAccount
