import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'utils/redux/hooks'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { updateUser } from 'utils/api/users'
import { useNotification } from 'utils/redux/slices/notificationSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import './EditProfile.scss'

// TODO: Added toast here as well

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { displayNotification } = useNotification()
  const {
    bio,
    firstName,
    lastName,
    links: { githubUrl, linkedinUrl, portfolioUrl },
    role,
  } = updateUserForm
  const nestedLinks = Object.keys(updateUserForm.links)

  useEffect(() => {
    console.log('authUser:', authUser)
    if (authUser) {
      setUpdateUserForm(currForm => {
        console.log('Updating user form with authUser:', authUser)
        return { ...currForm, ...authUser }
      })
    }

    if (authUser && authUser.bio) {
      setBioCharCount(authUser.bio.length)
    }
  }, [authUser])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    // check if the input name is one of the nested properties
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

  const handleProfileSave = () => {
    displayNotification({
      message: 'User profile successfully updated.',
    })
  }

  const handleCancel = () => {
    setUpdateUserForm({ ...authUser })
    navigate(`/users/${params.id}`)
  }

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(params.id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      navigate(`/users/${params.id}`)
    } catch (error) {
      console.log('Error occured when trying to update User Profile', error)
    }
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
          onClick={() => navigate(`/users/${params.id}`)}
        >
          <ArrowBackIosNewIcon className='editprofile__backArrow' />
          <p>Back</p>
        </IconButton>
      </div>
      <p className='editprofile__heading'>My Profile</p>
      <div className='editprofile__container'>
        <form onSubmit={handleUserUpdate} className='editprofile__form'>
          <div className='editprofile__image'>
            <IconButton
              aria-label='change profile pic'
              className='editprofile__cameraIcon'
            >
              <CameraAltOutlinedIcon className='editprofile__imageChange' />
            </IconButton>
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
