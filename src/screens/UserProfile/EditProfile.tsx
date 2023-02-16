import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  selectAuthUser,
  setAuthUser,
} from 'utilities/redux/slices/users/userSlice'
import { emptyUser } from 'utilities/data/userConstants'
import { UserInterface } from 'utilities/types/UserInterface'
import { createUserImage, updateUser } from 'utilities/api/users'
import { useNotification } from 'utilities/redux/hooks'
import './EditProfile.scss'

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [userForm, updateUserForm] = useState<UserInterface>(emptyUser)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profileImageFile, setProfileImageFile] = useState<File>()
  const {
    bio,
    firstName,
    lastName,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
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
  }, [authUser])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateUserForm({ ...userForm, [name]: value })
  }

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imageWasUpdated = !!profileImageFile
    if (profileImageFile) {
      await createUserImage(profileImageFile, authUser._id)
      // Waiting on user refresh bug ticket
      // window.location.reload();
    }

    const updatedUser = await updateUser(params.id, userForm, imageWasUpdated)
    dispatch(setAuthUser(updatedUser))
    navigate(`/users/${userId}`)
  }

  if (!authUser) {
    return <div>Loading user...</div>
  }

  return (
    <div className='editprofile-screen'>
      <p className='heading'>My Profile</p>
      <form onSubmit={handleUserUpdate}>
        <label>
          Profile Picture
          <input
            type='text'
            name='profilePicture'
            value={profilePicture}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          First Name
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          Last Name
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          I am a DROPDOWN
          <input
            type='text'
            name='role'
            value={role}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          About Me
          <input
            type='text'
            name='bio'
            value={bio}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          Portfolio URL
          <input
            type='text'
            name='portfolioUrl'
            value={portfolioUrl}
            onChange={event => handleInputChange(event)}
          />
        </label>

        <label>
          Linkedin URL
          <input
            type='text'
            name='linkedinUrl'
            value={linkedinUrl}
            onChange={event => handleInputChange(event)}
          />
        </label>

        {role === 'Software Engineer' && (
          <label>
            Github URL
            <input
              type='text'
              name='githubUrl'
              value={githubUrl}
              onChange={event => handleInputChange(event)}
            />
          </label>
        )}

        <button
          type='submit'
          onClick={() =>
            displayNotification({
              message: 'User profile successfully updated.',
            })
          }
        >
          Update Info
        </button>
      </form>
    </div>
  )
}
