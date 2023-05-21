import { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { PasswordInputProps } from 'interfaces/components/Input'
import { handleFormInputChange } from 'utils/helpers/stateHelpers'

export const PasswordInputs = (props: PasswordInputProps) => {
  const [passwordMatch, setPasswordMatch] = useState(null)
  const propsWithPasswordMatch = {
    ...props,
    passwordMatch,
    setPasswordMatch,
  }

  return (
    <div className='passwords-wrapper'>
      <Password {...propsWithPasswordMatch} name='password' />
      <ConfirmPassword {...propsWithPasswordMatch} name='confirmPassword' />
    </div>
  )
}

export const Password = ({
  formValues,
  name,
  passwordErrors,
  setFormValues,
  setPasswordErrors,
  setPasswordMatch,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'password'

  const handlePasswordChange = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)

    if (value.length === 0) {
      setPasswordErrors({})
    } else if (value.length < 8 && value.length >= 1) {
      setPasswordErrors({
        length: 'Password must be at least 8 characters',
      })
    } else {
      setPasswordErrors({
        uppercase:
          !/[A-Z]/.test(value) &&
          'Password must have at least one uppercase letter',
        lowercase:
          !/[a-z]/.test(value) &&
          'Password must have at least one lowercase letter',
        number: !/\d/.test(value) && 'Password must have at least one number',
      })
    }

    handlePasswordMatching(formValues.confirmPassword, value, setPasswordMatch)
  }

  const PasswordValidations = ({ errors }) => {
    const { length, lowercase, number, uppercase } = errors
    return (
      <div className='password-errors'>
        {length && <FormHelperText error={true}>{length}</FormHelperText>}
        {uppercase && <FormHelperText error={true}>{uppercase}</FormHelperText>}
        {lowercase && <FormHelperText error={true}>{lowercase}</FormHelperText>}
        {number && <FormHelperText error={true}>{number}</FormHelperText>}
      </div>
    )
  }

  return (
    <div className='password'>
      <FormControl variant='standard'>
        <InputLabel htmlFor={inputId}>Password</InputLabel>
        <Input
          id={inputId}
          name={name}
          required
          onChange={handlePasswordChange}
          type={inputType}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => toggleVisiblity(inputType, setInputType)}
              >
                {inputType === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <PasswordValidations errors={passwordErrors} />
      </FormControl>
    </div>
  )
}

export const ConfirmPassword = ({
  password,
  passwordMatch,
  name,
  setFormValues,
  setPasswordMatch,
}) => {
  const [inputType, setInputType] = useState('password')
  const inputId = 'confirmPassword'

  const handleConfirmPassword = e => {
    const { value } = e.target
    handleFormInputChange(e, setFormValues)
    handlePasswordMatching(value, password, setPasswordMatch)
  }

  return (
    <div className='confirm-password'>
      <FormControl variant='standard'>
        <InputLabel htmlFor={inputId}>Re-enter password</InputLabel>
        <Input
          id={inputId}
          name={name}
          onChange={handleConfirmPassword}
          required
          type={inputType}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => toggleVisiblity(inputType, setInputType)}
              >
                {inputType === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <PasswordMatchError matchStatus={passwordMatch} />
      </FormControl>
    </div>
  )
}

/* Helpers */
const PasswordMatchError = ({ matchStatus }) => {
  if (matchStatus === null) {
    return
  } else if (matchStatus) {
    return <FormHelperText>Passwords match!</FormHelperText>
  } else {
    return <FormHelperText error={true}>Passwords do not match.</FormHelperText>
  }
}

const toggleVisiblity = (inputType, setInputType) => {
  if (inputType === 'password') setInputType('text')
  else setInputType('password')
}

const handlePasswordMatching = (
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
