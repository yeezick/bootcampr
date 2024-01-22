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
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import './Onboarding.scss'

// TODO: Add Toasts also error handling Toasts as well

export const SetUpProfile = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const params = useParams()
  const dispatch = useDispatch()
  const { displayNotification } = useNotification()
  const { firstName, lastName } = updateUserForm
  const nestedLinks = Object.keys(updateUserForm.links)

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }

    setBioCharCount(authUser.bio.length)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

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

  const handleProfileSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(params.id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      displayNotification({
        message: 'User profile successfully updated.',
      })
      handlePageNavigation('next')
    } catch (error) {
      console.log('Error occured when trying to create User Profile', error)
    }
  }

  const handleSkipProfileSetup = () => {
    handlePageNavigation('next')
  }

  const handleCancel = () => {
    handlePageNavigation('previous')
  }

  let inputString =
    "I'm from... I live in... I choose this career path because... my hobbies are... A fun fact about me is..."
  const placeholder = inputString.replace(/\.\.\. /g, '...\n')

  return (
    <div className='setupProfile'>
      <div className='setupProfile__profile-header-cont'>
        <h2>Profile</h2>
        <p>
          We recommend you set up your profile now. This will help your team get
          to know you. You can start it, save it, and finish it later if you’d
          like. You can edit your profile by going to My Account.
        </p>
      </div>
      <div className='setupProfile__profile-container'>
        <form
          onSubmit={handleProfileSetup}
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
                className='setupProfile__profile-input'
                value={firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className='setupProfile__profile-label'>
              Last name
              <input
                type='text'
                name='lastName'
                className='setupProfile__profile-input'
                value={lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className='setupProfile__profile-label'>
              About me
              <TextareaAutosize
                name='bio'
                className='setupProfile__profile-textarea'
                onChange={handleInputChange}
                maxLength={500}
                placeholder={placeholder}
              />
              <div className='setupProfile__profile-bioCharCount'>
                {bioCharCount}/500 Character count
              </div>
            </label>
            <label className='setupProfile__profile-label'>
              Portfolio
              <input
                type='text'
                name='portfolioUrl'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
              />
            </label>
            <label className='setupProfile__profile-label'>
              GitHub (URL) Software Engineers only
              <input
                type='text'
                name='githubUrl'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
              />
            </label>
            <label className='setupProfile__profile-label'>
              Linkedin profile (URL)
              <input
                type='text'
                name='linkedinUrl'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className='setupProfile__profile-btns'>
            <div className='setupProfile__cta-container'>
              <button
                type='submit'
                className='setupProfile__profile-cancelBtn'
                onClick={handleCancel}
              >
                <FiArrowLeft className='setupProfile__profile-arrow-l' />
                <p>Availability</p>
              </button>
              <button type='submit' className='setupProfile__profile-saveBtn'>
                <p>Save profile</p>
                <FiArrowRight className='setupProfile__profile-arrow-r' />
              </button>
            </div>
            <button
              className='setupProfile__profile-link'
              onClick={handleSkipProfileSetup}
            >
              Skip profile set up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
