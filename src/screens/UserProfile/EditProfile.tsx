import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Avatar from 'components/Avatar/Avatar'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { updateUser } from 'utils/api/users'
import { useNotification } from 'utils/redux/slices/notificationSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import './EditProfile.scss'

export const EditProfile: React.FC = () => {
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

  return (
    <div className='editprofile'>
      <div className='editprofile__backContainer'>
        <IconButton
          aria-label='go back to view profile'
          className='editprofile__backBtn'
          onClick={() => navigate(`/users/${userId}`)}
        >
          <ArrowBackIosNewIcon className='editprofile__backArrow' />
          <p>Back</p>
        </IconButton>
      </div>
      <p className='editprofile__heading'>My Profile</p>
      <div className='editprofile__container'>
        <form onSubmit={handleUserUpdate} className='editprofile__form'>
          <div className='editprofile__image'>
            <Avatar
              hasIcon={true}
              clickable={false}
              iconButtonClassName='editprofile__cameraIcon'
              addPhotoIconClassName='editprofile__imageChange'
            />
          </div>
          <label className='editprofile__label'>
            First name
            <input
              type='text'
              name='firstName'
              className='editprofile__input'
              value={firstName}
              onChange={handleInputChange}
            />
          </label>

          <label className='editprofile__label'>
            Last name
            <input
              type='text'
              name='lastName'
              className='editprofile__input'
              value={lastName}
              onChange={handleInputChange}
            />
          </label>

          <label className='editprofile__label'>
            About me
            <TextareaAutosize
              name='bio'
              className='editprofile__textarea'
              value={bio}
              onChange={handleInputChange}
              maxLength={500}
            />
            <div className='editprofile__bioCharCount'>
              {bioCharCount}/500 characters
            </div>
          </label>

          <label className='editprofile__label'>
            Portfolio (URL)
            <input
              type='text'
              name='portfolioUrl'
              className='editprofile__input'
              value={portfolioUrl}
              onChange={handleInputChange}
            />
          </label>

          {role === 'Software Engineer' && (
            <label className='editprofile__label'>
              Github (URL) {role}
              <input
                type='text'
                name='githubUrl'
                className='editprofile__input'
                value={githubUrl}
                onChange={handleInputChange}
              />
            </label>
          )}

          <label className='editprofile__label'>
            Linkedin profile (URL)
            <input
              type='text'
              name='linkedinUrl'
              className='editprofile__input'
              value={linkedinUrl}
              onChange={handleInputChange}
            />
          </label>
          <div className='editprofile__btns'>
            <button
              type='submit'
              className='editprofile__cancelBtn'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='editprofile__saveBtn'
              onClick={handleProfileSave}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
