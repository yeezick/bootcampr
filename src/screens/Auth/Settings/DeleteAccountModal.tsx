import * as React from 'react'
import './Settings.scss'
import { deleteUserAccount, logOut } from 'utils/api'
import { useNavigate } from 'react-router-dom'
import { CommonModal } from 'components/CommonModal/CommonModal'
import { ButtonStyle } from 'utils/data/authSettingsConstants'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { logoutAuthUser, selectAuthUser } from 'utils/redux/slices/userSlice'

export const DeleteAccountModal = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { _id: userId } = useAppSelector(selectAuthUser)
  const navigate = useNavigate()

  const confirmDeleteUserAccount = async () => {
    const deletedAccount = await deleteUserAccount(userId)
    if (deletedAccount?.deletionStatus) {
      await logOut()
      dispatch(logoutAuthUser())
      navigate('/')
      return
    }
  }

  return (
    <div>
      <button onClick={handleOpen} className='delete-account-button'>
        Delete Account
      </button>
      <CommonModal
        isOpen={open}
        heading='Delete your account?'
        body='This will delete your account and all associated information. The operation cannot be undone.'
        confirmButtonLabel='Delete account'
        confirmButtonStyle={ButtonStyle.Red}
        handleConfirm={confirmDeleteUserAccount}
        cancelButtonLabel='Cancel'
        handleCancel={handleClose}
      />
    </div>
  )
}
