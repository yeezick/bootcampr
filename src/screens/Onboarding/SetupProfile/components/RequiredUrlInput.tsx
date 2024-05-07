import { validGithubUrl, validLinkedinUrl } from 'utils/components/Inputs'
import { isEmptyString } from 'utils/helpers/inputUtils'

export const RequiredUrlInput = ({
  errorState,
  handleInputChange,
  value,
  name,
  label,
}) => {
  const isLinkedInUrl = name === 'linkedinUrl'

  const requiredtext = isLinkedInUrl
    ? 'LinkedIn profile is required.'
    : 'Github URL is required'

  const invalidUrlText = isLinkedInUrl
    ? 'Not a valid LinkedIn URL.'
    : 'Not a valid GitHub URL.'

  const placeholderText = isLinkedInUrl
    ? 'https://www.linkedin.com/in/name'
    : 'https://www.github.com/profile'

  const displayInvalidUrlError = isLinkedInUrl
    ? !validLinkedinUrl(value)
    : !validGithubUrl(value)

  return (
    <label className='setupProfile__profile-label'>
      {label}
      <input
        type='text'
        name={name}
        className={`setupProfile__profile-input ${errorState && 'error'}`}
        onChange={handleInputChange}
        placeholder={placeholderText}
        value={value}
      />
      {isEmptyString(value) && <h6 className='error'>{requiredtext}</h6>}
      {!isEmptyString(value) && displayInvalidUrlError && (
        <h6 className='error'>{invalidUrlText}</h6>
      )}
    </label>
  )
}
