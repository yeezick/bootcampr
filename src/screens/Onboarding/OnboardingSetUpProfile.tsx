import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { createUserProfile } from 'utils/api'
import { setAuthUser } from 'utils/redux/slices/userSlice'
import { useNotification } from 'utils/redux/slices/notificationSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { IconButton } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import './Onboarding.scss'

// TODO: Add Toasts also error handling Toasts as well

export const OnboardingSetUpProfile = ({ handlePageNavigation }) => {
  const [userForm, updateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const [nameError, setNameError] = useState(true)
  const dispatch = useDispatch()
  const { displayNotification } = useNotification()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    // console.log('Updated User Form:', {
    //   ...userForm,
    //   [name]: value,
    // });

    if (name === 'bio') {
      updateUserForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }))
      setBioCharCount(value.length)
    } else {
      updateUserForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }))
    }

    if (name === 'firstName' || name === 'lastName') {
      if (userForm.firstName.trim() === '' || userForm.lastName.trim() === '') {
        setNameError(true)
      } else {
        setNameError(false)
      }
    }
  }

  const handleProfileSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userForm.firstName.trim() === '' || userForm.lastName.trim() === '') {
      setNameError(true)
      return
    }

    console.log('User Form:', userForm)

    try {
      console.log('Sending userForm data:', userForm)
      const createdUser = await createUserProfile(userForm)

      console.log('Response from server:', createdUser)

      dispatch(setAuthUser(createdUser))
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
  let placeholder = inputString.replace(/\.\.\. /g, '...\n')

  const saveBtnClassName = !nameError
    ? 'setupProfile__profile-saveBtn'
    : 'setupProfile__profile-disabledBtn'

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
              <IconButton
                aria-label='change profile pic'
                className='setupProfile__profile-cameraIcon'
              >
                <CameraAltOutlinedIcon className='setupProfile__profile-imageChange' />
              </IconButton>
            </div>
            <label className='setupProfile__profile-label'>
              First name
              <input
                type='text'
                name='firstName'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
              />
            </label>
            <label className='setupProfile__profile-label'>
              Last name
              <input
                type='text'
                name='lastName'
                className='setupProfile__profile-input'
                onChange={handleInputChange}
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
              <button
                type='submit'
                className={saveBtnClassName}
                disabled={nameError}
              >
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
