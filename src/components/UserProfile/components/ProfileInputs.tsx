import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { NameInput } from './NameInput'
import { AboutMeInput } from './AboutMeInput'
import { RequiredUrlInput } from './RequiredUrlInput'

export const ProfileInputs = ({
  updateUserForm,
  errorStates,
  handleInputChange,
}) => {
  const authUser = useAppSelector(selectAuthUser)
  const { firstName, lastName, bio, links } = updateUserForm

  return (
    <>
      <NameInput
        label={'*First name'}
        name={'firstName'}
        errorState={errorStates.firstName}
        handleInputChange={handleInputChange}
        value={firstName}
      />
      <NameInput
        label={'*Last name'}
        name={'lastName'}
        errorState={errorStates.lastName}
        handleInputChange={handleInputChange}
        value={lastName}
      />
      <AboutMeInput
        errorState={errorStates.bio}
        handleInputChange={handleInputChange}
        bio={bio}
      />
      <RequiredUrlInput
        errorState={errorStates.linkedinUrl}
        value={links.linkedinUrl}
        handleInputChange={handleInputChange}
        name='linkedinUrl'
        label='*Linkedin profile (URL)'
      />
      <label className='setupProfile__profile-label'>
        Portfolio
        <input
          type='text'
          name='portfolioUrl'
          className='setupProfile__profile-input'
          onChange={handleInputChange}
          placeholder='myportfoliokicksass.com'
          value={links.portfolioUrl}
        />
      </label>
      {authUser.role === 'Software Engineer' && (
        <RequiredUrlInput
          errorState={errorStates.githubUrl}
          value={links.githubUrl}
          handleInputChange={handleInputChange}
          name='githubUrl'
          label='*GitHub (URL)'
        />
      )}
    </>
  )
}
