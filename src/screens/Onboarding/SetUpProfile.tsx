import './SetUpProfile.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { updateUser } from 'utils/api/users'
import { useNotification } from 'utils/redux/slices/notificationSlice'
import Avatar from 'components/Avatar/Avatar'
import TextareaAutosize from 'react-textarea-autosize'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'

export const SetUpProfile = ({ handlePageNavigation }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const authUser = useSelector(selectAuthUser)
  const { displayNotification } = useNotification()

  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const [errorStates, setErrorStates] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    linkedinUrl: false,
  })
  const [isDisabled, setIsDisabled] = useState(true)

  const { firstName, lastName, bio, links } = updateUserForm
  const nestedLinks = ['githubUrl', 'linkedinUrl', 'portfolioUrl']

  let inputString =
    "I'm from... I live in... I chose this career path because... My hobbies are... A fun fact about me is..."
  const placeholder = inputString.replace(/\.\.\. /g, '...\n')

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }
  }, [])

  useEffect(() => {
    const charCount =
      authUser.bio && authUser.bio.length > 0 ? authUser.bio.length : 0
    setBioCharCount(charCount)

    const { firstName, lastName, bio, links } = updateUserForm
    const validForm = firstName && lastName && bio && links.linkedinUrl

    setIsDisabled(!validForm)
  }, [updateUserForm])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    checkErrorState(name, value)

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

  const handleNavigationButtons = async (e, direction: 'previous' | 'next') => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(params.id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      displayNotification({
        message: 'User profile successfully updated.',
      })
      handlePageNavigation(direction)
    } catch (error) {
      console.error('Error occured when trying to create User Profile', error)
    }
  }

  const checkErrorState = (name, value) => {
    setErrorStates({
      ...errorStates,
      [name]: value.length === 0,
    })
  }

  return (
    <div className='setupProfile'>
      <div className='setupProfile__profile-header-cont'>
        <h2>Profile</h2>
        <p>
          Set up your profile so your team can get to know you. Write a little
          about yourself. Input your LinkedIn profile. Adding a link to your
          portfolio is encouraged but not required. You can edit your profile
          later by going to My Account.
        </p>
        <i>
          We've input yor first and last name for you. You can change them, but
          a first and last name is required to complete onboarding
        </i>
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
            <label className='setupProfile__profile-label'>
              First name
              <input
                type='text'
                name='firstName'
                className={`setupProfile__profile-input ${
                  errorStates.firstName && 'error'
                }`}
                value={firstName}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                required
              />
              {errorStates.firstName && (
                <h6 className='error'>First name is required.</h6>
              )}
            </label>
            <label className='setupProfile__profile-label'>
              Last name
              <input
                type='text'
                name='lastName'
                className={`setupProfile__profile-input ${
                  errorStates.lastName && 'error'
                }`}
                value={lastName}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                required
              />
              {errorStates.lastName && (
                <h6 className='error'>Last name is required.</h6>
              )}
            </label>
            <label className='setupProfile__profile-label'>
              About me
              <TextareaAutosize
                name='bio'
                className={`setupProfile__profile-label ${
                  errorStates.bio && 'error'
                }`}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                maxLength={500}
                minRows={8}
                placeholder={placeholder}
                value={bio}
              />
              <div className='bio-undertext'>
                <div>
                  {errorStates.bio && (
                    <h6 className='error'>Tell us something about yourself.</h6>
                  )}
                </div>
                <div
                  className={`setupProfile__profile-bioCharCount ${
                    errorStates.bio && 'error'
                  }`}
                >
                  <p className={`${errorStates.bio && 'error'}`}>
                    {bioCharCount}/500
                  </p>
                </div>
              </div>
            </label>
            <label className='setupProfile__profile-label'>
              Linkedin profile (URL)
              <input
                type='text'
                name='linkedinUrl'
                className={`setupProfile__profile-input ${
                  errorStates.linkedinUrl && 'error'
                }`}
                onChange={handleInputChange}
                onBlur={e => checkErrorState(e.target.name, e.target.value)}
                placeholder='https://www.linkedin.com/in/name'
                value={links.linkedinUrl}
              />
              {errorStates.linkedinUrl && (
                <h6 className='error'>LinkedIn profile is required.</h6>
              )}
            </label>
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
            <label className='setupProfile__profile-label'>
              GitHub (URL) Software Engineers only
              <input
                type='text'
                name='githubUrl'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
                placeholder='myGitHubkicksass.com'
                value={links.githubUrl}
              />
            </label>
          </div>
          <div className='setupProfile__profile-btns'>
            <div className='setupProfile__cta-container'>
              <SecondaryButton
                text='Availability'
                handler={e => handleNavigationButtons(e, 'previous')}
                paginatorBtn={true}
              />
              <PrimaryButton
                text='Save profile'
                handler={e => handleNavigationButtons(e, 'next')}
                paginatorBtn={true}
                isDisabled={isDisabled}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
