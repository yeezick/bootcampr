import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { uiStatus, selectAuthUser, reset, updateProfile } from '../../utilities/redux/slices/users/userSlice';
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
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserForm({ ...userForm, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateProfile(userForm))
    navigate(`/users/${userId}`)
  }

  return (
    <div className="acct-setup-container">
    <h1>Hi, {firstName}!</h1>
    <section className="profile-photo-grid">
      <h4>Profile Photo:</h4>
      <img src={!profilePicture ? 'https://tinyurl.com/2tbvwnfb' : profilePicture} alt='photo' />
      <input onChange={handleChange} type='text' name='profilePicture' placeholder='Profile Photo' value={profilePicture} />
    </section>
    <h2>Set Up Your Profile</h2>
    <form onSubmit={handleSubmit}>
      <h4>First Name:</h4>
      <input onChange={handleChange} type='text' name='firstName' placeholder='First Name' value={firstName} />
      <h4>Last Name:</h4>
      <input onChange={handleChange} type='text' name='lastName' placeholder='Last Name' value={lastName} />
      <h4>About Me:</h4>
      <input onChange={handleChange} type='text' name='bio' placeholder='About Me' value={bio} />
      <h4>My Role:</h4>
      <input onChange={handleChange} type='text' name='role' placeholder='My Role' value={role} />
      <h2>Socials:</h2>
      <h4>LinkedIn URL:</h4>
      <input onChange={handleChange} type='text' name='linkedinUrl' placeholder='LinkedIn URL' value={linkedinUrl} />
      <h4>Portfolio URL:</h4>
      <input onChange={handleChange} type='text' name='portfolioUrl' placeholder='Portfolio URL' value={portfolioUrl} />
      <button type="submit">Submit Profile</button>
    </form>
  </div>
  )
}

export default RegisterUserInfo