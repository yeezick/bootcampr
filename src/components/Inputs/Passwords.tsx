import { useState } from 'react'
import { PasswordInputProps } from 'interfaces/components/Input'
import { MdCheck } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import {
  ConfirmNewPassword,
  CurrentPassword,
  NewPassword,
} from './PasswordInputs'

export const PasswordInputs = (props: PasswordInputProps) => {
  const [passwordMatch, setPasswordMatch] = useState(null)
  const { passwordInputName } = props
  const propsWithPasswordMatch = {
    ...props,
    passwordMatch,
    setPasswordMatch,
    passwordInputName,
  }

  return (
    <div className='password-inputs-wrapper'>
      {passwordInputName === 'settings-pwd-reset' && (
        <CurrentPassword {...propsWithPasswordMatch} name='currentPassword' />
      )}
      <NewPassword {...propsWithPasswordMatch} name='password' />
      <ConfirmNewPassword {...propsWithPasswordMatch} name='confirmPassword' />
    </div>
  )
}

/* Helpers */
export const PasswordMatchError = ({ matchStatus }) => {
  if (matchStatus === null) {
    return
  } else if (matchStatus) {
    return (
      <div className='match-status'>
        <MdCheck className='criteria-check' size={14} />
        <p className='password-criteria criteria-met'>Passwords match!</p>
      </div>
    )
  } else {
    return (
      <div className='match-status'>
        <RxCross2 className='criteria-cross' size={14} />
        <p className='password-criteria criteria-not-met'>
          Passwords don't match
        </p>
      </div>
    )
  }
}

export const toggleVisiblity = (inputType, setInputType) => {
  if (inputType === 'password') setInputType('text')
  else setInputType('password')
}

export const handlePasswordMatching = (
  confirmPassword,
  password,
  setPasswordMatch
) => {
  if (password === '' || confirmPassword === '') {
    setPasswordMatch(null)
  } else if (password === confirmPassword) {
    setPasswordMatch(true)
  } else {
    setPasswordMatch(false)
  }
}

export const PasswordCriteria = ({ criteria, errorState = 'neutral' }) => {
  return (
    <div className='password-criteria'>
      {errorState === 'criteria-met' && (
        <MdCheck className='criteria-check' size={14} />
      )}
      {errorState === 'criteria-not-met' && (
        <RxCross2 className='criteria-cross' size={14} />
      )}
      <p className={errorState}>{criteria}</p>
    </div>
  )
}
