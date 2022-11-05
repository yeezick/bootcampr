import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { uiStatus, selectAuthUser, reset, updateProfile, newUserCheck } from '../../utilities/redux/slices/users/userSlice';
import { UserInterface } from "../../utilities/types/UserInterface";
import { useEffect, useState } from "react";
import './RegisterUserInfo.scss'

const RegisterUserInfo: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  const authUser = useAppSelector(selectAuthUser)
  const [userForm, setUserForm] = useState<UserInterface>(authUser)
  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role, _id: userId } = userForm

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset())
      navigate(`/users/${userId}`)
      dispatch(newUserCheck(false))
    }

    if (status.isNewUser === false) {
      navigate(`/users/${userId}/edit`)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserForm({ ...userForm, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateProfile(userForm))
  }

  return (
    <div className="acct-setup-page">
      <h1>Hi, {firstName}!</h1>
      <div className="form-container">
        <section className="profile-photo-grid">
          <img src={!profilePicture ? 'https://tinyurl.com/yfhmvrmt' : profilePicture} alt='photo' />
          <label>Profile Photo:</label>
          <input onChange={handleChange} type='text' name='profilePicture' placeholder='Profile Photo' value={profilePicture} />
        </section>
        <div className="user-info-grid">
          <h2>Set Up Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label>First Name:</label>
              <input onChange={handleChange} type='text' name='firstName' placeholder='First Name' value={firstName} />
            </div>
            <div className="form-input">
              <label>Last Name:</label>
              <input onChange={handleChange} type='text' name='lastName' placeholder='Last Name' value={lastName} />
            </div>
            <div className="form-input">
              <label>About Me:</label>
              <input onChange={handleChange} type='text' name='bio' placeholder='About Me' value={bio} />
            </div>
            <div className="form-input">
              <label>My Role:</label>
              <input onChange={handleChange} type='text' name='role' placeholder='My Role' value={role} />
            </div>
            <h2>Socials:</h2>
            <div className="form-input">
              <label>LinkedIn URL:</label>
              <input onChange={handleChange} type='text' name='linkedinUrl' placeholder='LinkedIn URL' value={linkedinUrl} />
            </div>
            <div className="form-input">
              <label>Portfolio URL:</label>
              <input onChange={handleChange} type='text' name='portfolioUrl' placeholder='Portfolio URL' value={portfolioUrl} />
            </div>
            <div className="form-btn">
              <button type="submit">Submit Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterUserInfo