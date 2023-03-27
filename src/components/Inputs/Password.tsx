import { BaseInput } from './BaseInput'
import { InputProps } from 'interfaces/components/Input'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'

// Room for improvement, a lot of password-centric context lives in sign up
interface PasswordInterface extends InputProps {
  setInputType: React.Dispatch<React.SetStateAction<string>>
  inputType: string
}

export const Password = (props: PasswordInterface) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'
  const baseInputProps = {
    ...props,
    pattern: passwordRegex,
  }

  return (
    <div>
      <VisiblePasswordIcon {...props} />
      <BaseInput {...baseInputProps} />
    </div>
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
