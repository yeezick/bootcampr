import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { emptyUser } from '../../utilities/data/userConstants';
import { UserInterface } from '../../utilities/types/UserInterface';
import { updateUser } from '../../utilities/api/users';
import './EditProfile.scss';

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [userForm, updateUserForm] = useState<UserInterface>(emptyUser);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role, _id: userId } = userForm;

  useEffect(() => {
    if (authUser) {
      updateUserForm((currForm) => {
        return { ...currForm, ...authUser };
      });
    }
  }, [authUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserForm({ ...userForm, [name]: value });
  };

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = await updateUser(params.id, userForm);
    dispatch(setAuthUser(updatedUser));
    navigate(`/users/${userId}`);
  };

  if (!authUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="editprofile-screen">
      <form onSubmit={handleUserUpdate}>
        <label>
          Profile Picture
          <input
            type="text"
            name="profilePicture"
            value={profilePicture}
            onChange={(event) => handleInputChange(event)}
          />
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

        <button type="button">+ Add Custom Link</button>

        <label htmlFor="dynamicUrlName">
          <input type="text" />
        </label>

        <label htmlFor="dynamicUrlLink">
          <input type="text" />
        </label>

        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};
