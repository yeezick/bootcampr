import { useEffect, useState } from 'react'
import { BaseInput } from './BaseInput'
import { InputProps } from 'interfaces/components/Input'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { TextField, FormHelperText } from '@mui/material'

// Room for improvement, a lot of password-centric context lives in sign up
interface PasswordInterface extends InputProps {
  inputType: string
  passwordValidations?: PasswordValidations
  setFormValues: React.Dispatch<React.SetStateAction<object>>
  setInputType: React.Dispatch<React.SetStateAction<string>>
}

// interface BaseInputProps extends PasswordInterface {
//   onChange?: React.ChangeEventHandler<HTMLInputElement>
// }

type charValidation = {
  isError: boolean
  regex: RegExp
  text: string
}

interface PasswordValidations {
  lowercase: charValidation
  minChars: boolean
  number: charValidation
  uppercase: charValidation
  visible: boolean
}

const basePasswordValidations = {
  lowercase: {
    isError: null,
    regex: /[a-z]/,
    text: '1 lowercase letter',
  },
  minChars: true,
  number: {
    isError: null,
    regex: /^\d$/,
    text: '1 number',
  },
  uppercase: {
    isError: null,
    regex: /[A-Z]/,
    text: '1 uppercase letter',
  },
  visible: false,
}

interface ErrorInterface {
  length?: string
  uppercase?: string
  lowercase?: string
  number?: string
}

export const Password = (props: PasswordInterface) => {
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ErrorInterface>({})

  const handlePasswordChange = event => {
    const value = event.target.value
    setPassword(value)
    if (value.length === 0) {
      setErrors({})
    } else if (value.length < 8 && value.length >= 1) {
      setErrors({
        length: 'Password must be at least 8 characters',
      })
    } else {
      setErrors({
        uppercase:
          !/[A-Z]/.test(value) &&
          'Password must have at least one uppercase letter',
        lowercase:
          !/[a-z]/.test(value) &&
          'Password must have at least one lowercase letter',
        number: !/\d/.test(value) && 'Password must have at least one number',
      })
    }
  }

  return (
    <>
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
        error={Object.values(errors).some(error => error !== '')}
        helperText={
          <>
            {errors.length && <FormHelperText>{errors.length}</FormHelperText>}
            {errors.uppercase && (
              <FormHelperText>{errors.uppercase}</FormHelperText>
            )}
            {errors.lowercase && (
              <FormHelperText>{errors.lowercase}</FormHelperText>
            )}
            {errors.number && <FormHelperText>{errors.number}</FormHelperText>}
          </>
        }
      />
    </>
  )
}

const VisiblePasswordIcon = ({
  setInputType,
  inputType,
}: PasswordInterface) => {
  const toggleVisiblity = () => {
    if (inputType === 'password') setInputType('text')
    else setInputType('password')
  }

  if (inputType === 'password') {
    return <BsEyeSlash onClick={toggleVisiblity} className='pwd-reveal-gray' />
  } else {
    return <BsEyeFill onClick={toggleVisiblity} className='pwd-reveal' />
  }
}
