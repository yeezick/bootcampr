import { CommonModal } from 'components/CommonModal/CommonModal'
import { useState } from 'react'

export const UpdateEmailAddressLink = () => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <>
      <div onClick={() => setShowModal(true)}>Update your email address</div>
      <CommonModal
        isOpen={showModal}
        handleCancel={() => setShowModal(false)}
        handleConfirm={() => {}}
        heading='Update email address'
        body="We'll send the confirmation email to this email address."
        body2='You will also use it to log in.'
        // body3={}
        inputType='email'
        inputValue={email}
        inputOnChange={() => {}}
        inputPlaceholder='email@emailaddress.com'
        isError={false}
        inputErrorMessage='Please enter a valid email address.'
        cancelButtonLabel='Cancel'
        confirmButtonLabel='Update email address'
        confirmButtonDisabled={isDisabled}
      />
    </>
  )
}
