import { BaseInput } from './BaseInput'
import { InputProps, VisiblePasswordProps } from 'interfaces/components/Input'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'

// Room for improvement, a lot of password-centric context lives in sign up
export const Password = (props: InputProps) => {
  const { label, name, passwordProps } = props

  return (
    <div className='form-input'>
      <label htmlFor={name}>{label}</label>
      <VisiblePasswordIcon {...passwordProps} />
      <BaseInput {...props} />
    </div>
  )
}

const VisiblePasswordIcon = ({
  setInputType,
  inputType,
}: VisiblePasswordProps) => {
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
