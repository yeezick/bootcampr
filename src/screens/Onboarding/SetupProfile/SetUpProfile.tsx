import './SetUpProfile.scss'
import { useEffect, useState } from 'react'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import Avatar from 'components/Avatar/Avatar'
import { useAppSelector } from 'utils/redux/hooks'
import { validGithubUrl, validLinkedinUrl } from 'utils/components/Inputs'
import { isEmptyString } from 'utils/helpers/inputUtils'
import { SetupProfileBtns } from './components/SetupProfileBtns'
import { AboutMeInput } from './components/AboutMeInput'
import { NameInput } from './components/NameInput'
import { RequiredUrlInput } from './components/RequiredUrlInput'

// BC-787: remove BEM styling
export const SetUpProfile = ({ handlePageNavigation }) => {
  const authUser = useAppSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const [errorStates, setErrorStates] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    linkedinUrl: false,
    githubUrl: false,
  })
  const [disabledBtn, setDisabledBtn] = useState(true)
  const { firstName, lastName, bio, links } = updateUserForm
  const nestedLinks = ['githubUrl', 'linkedinUrl', 'portfolioUrl']

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
      setBioCharCount(authUser.bio.length)
    }
  }, [authUser])

  useEffect(() => {
    const { firstName, lastName, bio, links, role } = updateUserForm
    const validForm = firstName && lastName && bio && links.linkedinUrl

    if (validForm && validLinkedinUrl(links.linkedinUrl)) {
      if (role === 'Software Engineer' && !validGithubUrl(links.githubUrl)) {
        setDisabledBtn(true)
        return
      }
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }, [updateUserForm])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    checkErrorState(e, setErrorStates)

    if (nestedLinks.includes(name)) {
      setUpdateUserForm(prevForm => ({
        ...prevForm,
        links: {
          ...prevForm.links,
          [name]: value,
        },
      }))
    } else {
      setUpdateUserForm({ ...updateUserForm, [name]: value })
    }

    if (name === 'bio') {
      setBioCharCount(value.length)
    }
  }

  return (
    <div className='setupProfile'>
      <div className='setupProfile__profile-header-cont'>
        <h2>Profile</h2>
        <p>Set up your profile so your team can get to know you.</p>
        <p>You can edit your profile later by going to My Account.</p>
        <i>*Required fields</i>
      </div>
      <div className='setupProfile__profile-container'>
        <form
          onSubmit={e => handlePageNavigation(e, 'next')}
          className='setupProfile__profile-form'
        >
          <div className='setupProfile__inputs-container'>
            <div className='setupProfile__profile-image'>
              <Avatar
                hasIcon={true}
                clickable={false}
                iconButtonClassName='setupProfile__cameraIcon'
                addPhotoIconId='imageChange'
              />
            </div>
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
              bioCharCount={bioCharCount}
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
          </div>
          <SetupProfileBtns
            disabledBtn={disabledBtn}
            updateUserForm={updateUserForm}
            handlePageNavigation={handlePageNavigation}
          />
        </form>
      </div>
    </div>
  )
}

const checkErrorState = (e, setErrorStates) => {
  const { name, value } = e.target
  setErrorStates(errorStates => {
    return {
      ...errorStates,
      [name]: isEmptyString(value),
    }
  })
}
