import { InputProps } from 'interfaces/components/Input'
import 'screens/Auth/SignUp/SignUp.scss'
import './inputs.scss'

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
}
interface InputValidatorProps {
  passwordValidations: PasswordValidations
}

export const BaseInput = (props: InputProps) => {
  const { autoComplete, customInputProps, label, name, pattern, placeholder } =
    props
  const inputLabelProps = {
    helperText: customInputProps?.helperText,
    label,
    name,
  }

  let baseInputProps = {
    ...props,
    autoComplete: autoComplete ? autoComplete : 'off',
    placeholder: placeholder ? placeholder : '',
    pattern: pattern ? pattern : '',
  }

  // this is to remove custom atttributes unrecognized by DOM elements
  // baseInputProps = {
  //   ...removeKeyFromObject(baseInputProps, 'customInputProps'),
  // }

  return (
    <div className='form-input'>
      {label && <InputLabel {...inputLabelProps} />}
      <input {...baseInputProps} />
      {customInputProps?.passwordValidations && (
        <InputValidations
          passwordValidations={customInputProps.passwordValidations}
        />
      )}
    </div>
  )
}

const InputLabel = ({ helperText, label, name }) => (
  <div className='input-label'>
    <label htmlFor={name}>{label}</label>
    {helperText && <span className='input-helper'>{helperText}</span>}
  </div>
)

// TODO: discusss with team if this is bad practice as it's very complicated
// and not very DRY since the code can easily be read below.
/**
 * Component to render multiple input validations in 3 states:
 * - error (red)
 * - success (green)
 * - default (black)
 * @param {ValidationMessage[]} validationMessages
 * Array of objects containing message text and type
 *
 * The following are the types of each message.
 * @param {string[]} violations Each string represents a single error.
 * @param {boolean} type Type is for future cases where we might want to render
 *    different kinds of colors.
 */
const InputValidations = ({ passwordValidations }: InputValidatorProps) => {
  return (
    <div className='input-validation-wrapper'>
      {Object.keys(passwordValidations).map((validation, key) => {
        const { isError, text } = passwordValidations[validation]
        let className: string

        switch (isError) {
          case true:
            className = 'error'
            break
          case false:
            className = 'warning'
            break
          default:
            return
        }

        // When this becomes more complicated than just a <p>,
        // break into its own component
        return (
          <p
            className={`input-validation-item ${className}`}
            key={`${key}-validation-${className}`}
          >
            {text}
          </p>
        )
      })}
    </div>
  )
}

// const removeKeyFromObject = (obj, key) => {
//   const { [key]: _, ...restOfObj } = obj
//   return restOfObj
// }
