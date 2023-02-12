import { UpdateCredentialsFeedbackMessageProps } from '../../../utilities/types/AccountSettingsInterface'

export const UpdateFeedback = ({
  updateStatus,
}: UpdateCredentialsFeedbackMessageProps): JSX.Element => {
  const renderErrorMessage = () => {
    switch (updateStatus) {
      case 'authorized':
        return <p>✔️ Update Successful</p>
      case 'unauthorized':
        return <p>❌ Wrong Password</p>
      case 'error':
        return <p>❌ Error, Please try again later</p>
      default:
        return null
    }
  }

  return <div>{renderErrorMessage()}</div>
}
