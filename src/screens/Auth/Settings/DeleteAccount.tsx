import React from 'react'
import { DeleteAccountModal } from './DeleteAccountModal'
import './Settings.scss'
export const DeleteAccount = ({}) => {
  return (
    <div className='DeleteAccount'>
      <h1>Deleting your account cannot be undone.</h1>
      <p className='delete-paragraph'>
        All saved information will be lost. We’re sorry to see you go but wish
        you all the best! Delete account
      </p>
      <DeleteAccountModal />
    </div>
  )
}

export default DeleteAccount
