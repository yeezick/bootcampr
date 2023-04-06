import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utilities/redux/hooks'
import { selectAuthUser, updateProfile } from 'utilities/redux/slices/userSlice'
import { UserInterface } from 'utilities/types'
import { emptyUser } from 'utilities/data/userConstants'
import './RegisterUserInfo.scss'
import { UploadUserImage } from 'screens/Auth'
import { RegisterUserImage } from 'screens/Auth'
import { createUserImage } from 'utilities/api'

export const RegisterUserInfo: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(selectAuthUser)
  const [profileImageFile, setProfileImageFile] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string>()
  const [userForm, setUserForm] = useState<UserInterface>(emptyUser)
  const {
    bio,
    firstName,
    githubUrl,
    lastName,
    linkedinUrl,
    portfolioUrl,
    profilePicture,
  } = userForm

  useEffect(() => {
    if (authUser.role) {
      navigate(`/users/${authUser._id}/edit`)
    }
    if (authUser) {
      setUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }
  }, [authUser])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setUserForm({ ...userForm, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let imageWasUpdated = false
    if (profileImageFile) {
      await createUserImage(profileImageFile, authUser._id)
      imageWasUpdated = true
    }
    dispatch(updateProfile({ ...userForm, imageWasUpdated: imageWasUpdated }))

    navigate(`/users/${authUser._id}`)
  }

  return (
    <div className='acct-setup-page'>
      <h1>Hi, {firstName}!</h1>
      <div className='form-container'>
        <section className='profile-photo-grid'>
          <UploadUserImage
            previewImage={previewImage}
            authUser={{ profilePicture: profilePicture }}
          />
          <label>Profile Photo:</label>
          <RegisterUserImage
            setProfileImageFile={setProfileImageFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            profileImageFile={profileImageFile}
          />
        </section>

        <div className='user-info-grid'>
          <h2>Set Up Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-input'>
              <label>First Name:</label>
              <input
                onChange={handleChange}
                type='text'
                name='firstName'
                placeholder='First Name'
                value={firstName}
              />
            </div>

            <div className='form-input'>
              <label>Last Name:</label>
              <input
                onChange={handleChange}
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={lastName}
              />
            </div>

            <div className='form-input'>
              <label>About Me:</label>
              <input
                onChange={handleChange}
                type='text'
                name='bio'
                placeholder='About Me'
                value={bio}
              />
            </div>

            <div className='form-input'>
              <label>My Role:</label>
              <select name='role' onChange={handleChange}>
                <option value='0'></option>
                <option value='UX Designer'>UX Designer</option>
                <option value='Software Engineer'>Software Engineer</option>
              </select>
            </div>

            <h2>Socials:</h2>
            <div className='form-input'>
              <label>LinkedIn URL:</label>
              <input
                onChange={handleChange}
                type='text'
                name='linkedinUrl'
                placeholder='LinkedIn URL'
                value={linkedinUrl}
              />
            </div>

            <div className='form-input'>
              <label>Portfolio URL:</label>
              <input
                onChange={handleChange}
                type='text'
                name='portfolioUrl'
                placeholder='Portfolio URL'
                value={portfolioUrl}
              />
            </div>

            {userForm.role === 'Software Engineer' && (
              <div className='form-input'>
                <label>Github URL:</label>
                <input
                  onChange={handleChange}
                  type='text'
                  name='githubUrl'
                  placeholder='Github URL'
                  value={githubUrl}
                />
              </div>
            )}

            <div className='form-btn'>
              <button type='submit'>Submit Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
