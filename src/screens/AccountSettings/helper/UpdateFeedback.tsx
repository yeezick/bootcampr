

interface UpdateCredentialsFeedbackMessageProps {
  updateStatus: string;
}

const UpdateFeedback = ({ updateStatus }: UpdateCredentialsFeedbackMessageProps): JSX.Element => {

  return (
    <div>
      {updateStatus === 'authorized' && <p>✔️ Update Successful</p>}
      {updateStatus === 'unauthorized' && <p>❌ Wrong Password</p>}
      {updateStatus === 'error' && <p>❌ Error, Please try again later</p>}
    </div>
  )
}


export default UpdateFeedback;