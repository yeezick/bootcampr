import { useEffect } from 'react'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'

interface InputProps {
  autoComplete?: string
  inputRef: React.MutableRefObject<any>
  label: string
  name: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  passwordProps?: VisiblePasswordProps
  placeholder?: string
  required?: boolean
  type: string
  value: string
}

interface VisiblePasswordProps {
  setInputType: React.Dispatch<React.SetStateAction<string>>
  inputType: string
}

export const Input = (props: InputProps) => {
  const {
    autoComplete,
    inputRef,
    label,
    name,
    onChange,
    passwordProps,
    placeholder,
    required,
    type,
    value,
  } = props

  useEffect(() => inputRef.current.focus(), [value])

  const VisiblePasswordIcon = ({
    setInputType,
    inputType,
  }: VisiblePasswordProps) => {
    const toggleVisiblity = () => {
      if (inputType === 'password') setInputType('text')
      else setInputType('password')
    }

    if (inputType === 'password') {
      return (
        <BsEyeSlash onClick={toggleVisiblity} className='pwd-reveal-gray' />
      )
    } else {
      return <BsEyeFill onClick={toggleVisiblity} className='pwd-reveal' />
    }
  }

  const CustomInput = () => (
    <input
      autoComplete={autoComplete}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={placeholder ? placeholder : ''}
      ref={inputRef}
      required={required}
      type={type}
      value={value}
    />
  )

  return (
    <div className='form-input'>
      <label htmlFor={name}>{label}</label>
      {passwordProps && <VisiblePasswordIcon {...passwordProps} />}
      <CustomInput />
    </div>
  )
}
