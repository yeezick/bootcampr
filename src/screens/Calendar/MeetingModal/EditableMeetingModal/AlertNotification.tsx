import * as React from 'react'
import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

export default function AlertNotification({ handleCloseAlert, openAlert }) {
  return (
    <div className='alert-container'>
      {openAlert ? (
        <Alert
          icon={<CheckIcon fontSize='inherit' />}
          severity='success'
          onClose={() => handleCloseAlert()}
        >
          Invite sent successfully!
        </Alert>
      ) : null}
    </div>
  )
}
