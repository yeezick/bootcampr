import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'utils/redux/hooks'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import { updateUser } from 'utils/api/users'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import './EditProfile.scss'

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [updatedUserForm, setUpdatedUserForm] =
    useState<UserInterface>(emptyUser)
  const [bioCharCount, setBioCharCount] = useState(0)
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    bio,
    firstName,
    lastName,
    links: { githubUrl, linkedinUrl, portfolioUrl },
    role,
  } = updatedUserForm
  const nestedLinks = Object.keys(updatedUserForm.links)

  useEffect(() => {
    if (authUser) {
      setUpdatedUserForm(currForm => {
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
    if (nestedLinks.includes(name)) {
      setUpdatedUserForm(prevForm => ({
        ...prevForm,
        links: {
          ...prevForm.links,
          [name]: value,
        },
      }))
    } else {
      setUpdatedUserForm({ ...updatedUserForm, [name]: value })
    }

    if (name === 'bio') {
      setBioCharCount(value.length)
    }
  }

  const handleCancel = () => {
    setUpdatedUserForm({ ...authUser })
    navigate(`/users/${params.id}`)
  }

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const updatedUser = await updateUser(params.id, updatedUserForm)
      dispatch(setAuthUser(updatedUser))
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Profile saved!',
          duration: 3000,
          vertical: 'top',
          horizontal: 'center',
          severity: 'success',
        })
      )
      navigate(`/users/${params.id}`)
    } catch (error) {
      console.log('Error occured when trying to update User Profile', error)
      dispatch(
        createSnackBar({
          isOpen: true,
          message: 'Failed to update user profile. Please try again.',
          duration: 3000,
          severity: 'error',
        })
      )
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
            <button type='submit' className='editprofile__saveBtn'>
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
