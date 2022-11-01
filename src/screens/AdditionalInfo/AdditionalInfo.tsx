import React from "react";
import { useAppSelector } from "../../utilities/redux/hooks";
import './AdditionalInfo.scss'

const AdditionalInfo: React.FC = () => {

  const { bio, email, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role } = useAppSelector((state) => state.ui.auth.user)

  return (
    <div className="acct-setup-container">
      <img src='https://tinyurl.com/2tbvwnfb' alt='photo' />
      <h2>Set Up Your Profile</h2>
      <h3>First Name: {firstName}</h3>
      <h3>Last Name: {lastName}</h3>
      <h3>Email: {email}</h3>
      <h3>Bio: {bio}</h3>
      <h3>Role: {role}</h3>
      <h2>Socials</h2>
      <h3>LinkedIn URL: {linkedinUrl}</h3>
      <h3>Portfolio URL: {portfolioUrl}</h3>
      <h3>Profile Photo URL: {portfolioUrl}</h3>
    </div>
  )
}

export default AdditionalInfo