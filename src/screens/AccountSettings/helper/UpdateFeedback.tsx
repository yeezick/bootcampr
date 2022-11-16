

interface UpdateCredentialsFeedbackMessageProps {
  updateStatus: string;
}

const UpdateFeedback = ({ updateStatus }: UpdateCredentialsFeedbackMessageProps): JSX.Element => {

  return (
    <div>
      {updateStatus === 'authorized' && <p>✔️ Update Successful</p>}
      {updateStatus === 'unauthorized' && <p>❌ Wrong Password</p>}
      {updateStatus === 'error' && <p>❌ Error, Please try again later</p>}
      {updateStatus === 'password-match-error' && <p>❌ Passwords don't match</p>}
      {updateStatus === 'email-match-error' && <p>❌ Emails don't match</p>}
      {updateStatus === 'invalid-email' && <p>❌ Invalid Email</p>}
      {updateStatus === 'enter-valid-password' && <p>❌ Please Enter A Valid Password</p>}
    </div>
  )
}


export default UpdateFeedback;