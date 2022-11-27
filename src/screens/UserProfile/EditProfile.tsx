import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { AddImageInterface, UserInterface } from '../../utilities/types/UserInterface';
import { createUserImage, updateUser } from '../../utilities/api/users';
import './EditProfile.scss';
import AddUserProfileImage from '../SignUp/AddUserProfileImage/AddUserProfileImage';

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [userForm, updateUserForm] = useState<UserInterface>(authUser);
  const [profileUrl, setProfileUrl] = useState<string>();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImageFile, setProfileImageFile] = useState<AddImageInterface>();

  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role, _id: userId } = userForm;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserForm({ ...userForm, [name]: value });
  };

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageWasUpdated = !!profileImageFile;
    if (profileImageFile) await createUserImage(profileImageFile, authUser._id);
    const updatedUser = await updateUser(params.id, userForm, imageWasUpdated);
    dispatch(setAuthUser(updatedUser));
    navigate(`/users/${userId}`);
    window.location.reload();
  };

  if (!authUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="editprofile-screen">
      <img src={profilePicture} alt="photo" key={Date.now()} />
      <form onSubmit={handleUserUpdate}>
        <label>
          update Profile image
          <AddUserProfileImage setProfileImageFile={setProfileImageFile} />
        </label>
        <label>
          First Name
          <input type="text" name="firstName" value={firstName} onChange={(event) => handleInputChange(event)} />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" value={lastName} onChange={(event) => handleInputChange(event)} />
        </label>
        <label>
          I am a DROPDOWN
          <input type="text" name="role" value={role} onChange={(event) => handleInputChange(event)} />
        </label>
        <label>
          About Me
          <input type="text" name="bio" value={bio} onChange={(event) => handleInputChange(event)} />
        </label>
        <label>
          Portfolio URL
          <input type="text" name="portfolioUrl" value={portfolioUrl} onChange={(event) => handleInputChange(event)} />
        </label>
        <label>
          Linkedin URL
          <input type="text" name="linkedinUrl" value={linkedinUrl} onChange={(event) => handleInputChange(event)} />
        </label>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};
