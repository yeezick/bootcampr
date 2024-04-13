import { CommonModal } from 'components/CommonModal/CommonModal'
import { useState } from 'react'
import { verifyEmail } from 'utils/api'

export const UpdateEmailAddressLink = () => {
  const [formData, setFormData] = useState({
    email: '',
    isError: false,
    errorMessage: '',
    showModal: false,
  })

  const handleEmailChange = e => {
    const newEmail = e.target.value.trim()
    setFormData(prevState => ({
      ...prevState,
      isError: false,
      email: newEmail,
    }))
  }

  const handleSubmit = async () => {
    const { email } = formData
    const { status, message } = await verifyEmail(email)

    setFormData(prevState => ({
      ...prevState,
      isError: status >= 400,
      errorMessage: message,
    }))
  }

  const onCloseModal = () => {
    setFormData({
      email: '',
      isError: false,
      errorMessage: '',
      showModal: false,
    })
  }

  return (
    <>
      <div
        onClick={() =>
          setFormData(prevState => ({ ...prevState, showModal: true }))
        }
      >
        Update your email address
      </div>
      {formData.showModal && (
        <CommonModal
          isOpen={true}
          handleCancel={onCloseModal}
          handleConfirm={handleSubmit}
          heading='Update email address'
          body="We'll send the confirmation email to this email address."
          body2='You will also use it to log in.'
          inputType='email'
          inputValue={formData.email}
          inputOnChange={handleEmailChange}
          inputPlaceholder='email@emailaddress.com'
          isError={formData.isError}
          inputErrorMessage={formData.errorMessage}
          cancelButtonLabel='Cancel'
          confirmButtonLabel='Update email address'
          confirmButtonDisabled={!formData.email}
          // customWidth={350} //address custom styles later
        />
      )}
    </>
  )
}
