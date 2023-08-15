import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { updateUser } from 'utils/api/users'
import { useNotification } from 'utils/redux/slices/notificationSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { IconButton } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import './Onboarding.scss'

// TODO: Alter functionality to be setup profile and not edit profile
// TODO: Find out what and where Skip profile takes u and does
// TODO: Confirm if Avatar will have initials or image upload as default here

export const OnboardingSetUpProfile = () => {
  const authUser = useSelector(selectAuthUser)
  const [userForm, updateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    bio,
    firstName,
    lastName,
    links: { githubUrl, linkedinUrl, portfolioUrl },
    profilePicture,
    role,
    _id: userId,
  } = userForm

  const { displayNotification } = useNotification()

  useEffect(() => {
    if (authUser) {
      updateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }

    setBioCharCount(authUser.bio.length)
  }, [])

  const nestedLinks = Object.keys(userForm.links)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    // check if the input name is one of the nested properties
    if (nestedLinks.includes(name)) {
      updateUserForm(prevForm => ({
        ...prevForm,
        links: {
          ...prevForm.links,
          [name]: value,
        },
      }))
    } else {
      // It's a top level property
      updateUserForm({ ...userForm, [name]: value })
    }

    if (name === 'bio') {
      setBioCharCount(value.length)
    }
  }

  const handleProfileSave = () => {
    displayNotification({
      message: 'User profile successfully updated.',
    })
  }

  const handleCancel = () => {
    updateUserForm({ ...authUser })
    navigate(`/users/${authUser._id}`)
  }

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedUser = await updateUser(params.id, userForm)
    dispatch(setAuthUser(updatedUser))
    navigate(`/users/${userId}`)
  }

  if (!authUser) {
    return <div>Loading user...</div>
  }

  let inputString =
    "I'm from... I live in... I choose this career path because... my hobbies are... A fun fact about me is..."
  let placeholder = inputString.replace(/\.\.\. /g, '...\n')

  return (
    <div className='onboarding'>
      <div className='onboarding__profile-header-cont'>
        <h2>Profile</h2>
        <p>
          We recommend you set up your profile now. This will help your team get
          to know you. You can start it, save it, and finish it later if you’d
          like. You can edit your profile by going to My Account.
        </p>
      </div>
      <div className='onboarding__profile-container'>
        <form onSubmit={handleUserUpdate} className='onboarding__profile-form'>
          <div className='onboarding__profile-image'>
            <IconButton
              aria-label='change profile pic'
              className='onboarding__profile-cameraIcon'
            >
              <CameraAltOutlinedIcon className='onboarding__profile-imageChange' />
            </IconButton>
          </div>

          <label className='onboarding__profile-label'>
            First name
            <input
              type='text'
              name='firstName'
              className='onboarding__profile-input'
              value={firstName}
              onChange={handleInputChange}
            />
          </label>

          <label className='onboarding__profile-label'>
            Last name
            <input
              type='text'
              name='lastName'
              className='onboarding__profile-input'
              value={lastName}
              onChange={handleInputChange}
            />
          </label>

          <label className='onboarding__profile-label'>
            About me
            <TextareaAutosize
              name='bio'
              className='onboarding__profile-textarea'
              value={bio}
              onChange={handleInputChange}
              maxLength={500}
              placeholder={placeholder}
            />
            <div className='onboarding__profile-bioCharCount'>
              {bioCharCount}/500 characters
            </div>
          </label>

          <label className='onboarding__profile-label'>
            Portfolio (URL)
            <input
              type='text'
              name='portfolioUrl'
              className='onboarding__profile-input'
              value={portfolioUrl}
              onChange={handleInputChange}
            />
          </label>

          {role === 'Software Engineer' && (
            <label className='onboarding__profile-label'>
              Github (URL) {role}
              <input
                type='text'
                name='githubUrl'
                className='onboarding__profile-input'
                value={githubUrl}
                onChange={handleInputChange}
              />
            </label>
          )}

          <label className='onboarding__profile-label'>
            Linkedin profile (URL)
            <input
              type='text'
              name='linkedinUrl'
              className='onboarding__profile-input'
              value={linkedinUrl}
              onChange={handleInputChange}
            />
          </label>
          <div className='onboarding__profile-btns'>
            <button
              type='submit'
              className='onboarding__profile-cancelBtn'
              onClick={handleCancel}
            >
              <FiArrowLeft className='onboarding__profile-arrow-l' />
              <p>Availability</p>
            </button>
            <button
              type='submit'
              className='onboarding__profile-saveBtn'
              onClick={handleProfileSave}
            >
              <p>Save profile</p>
              <FiArrowRight className='onboarding__profile-arrow-r' />
            </button>
          </div>
          <Link className='onboarding__profile-link' to=''>
            Skip profile set up
          </Link>
        </form>
      </div>
    </div>
  )
}
