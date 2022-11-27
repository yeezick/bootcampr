import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { emptyUrlLinks, emptyUser } from '../../utilities/data/userConstants';
import { CustomUrlInterface, UserInterface } from '../../utilities/types/UserInterface';
import { updateUser } from '../../utilities/api/users';
import './EditProfile.scss';

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [userForm, updateUserForm] = useState<UserInterface>(emptyUser);
  const [customUrlForm, setCustomUrlForm] = useState<CustomUrlInterface>(emptyUrlLinks);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    bio,
    firstName,
    lastName,
    linkedinUrl,
    portfolioUrl,
    profilePicture,
    role,
    _id: userId,
    customProfileLinks,
  } = userForm;
  const { customUrlLink, customUrlName } = customUrlForm;
  const [customInputs, setCustomInputs] = useState<any>([]);

  useEffect(() => {
    if (authUser) {
      updateUserForm((currForm) => {
        return { ...currForm, ...authUser };
      });
    }
  }, [authUser]);

  console.log(customProfileLinks);

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

  const addCustomInput = () => {
    setCustomInputs((link: any) => {
      return [
        ...link,
        {
          type: 'text',
          value: '',
        },
      ];
    });
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    console.log(id);
    setCustomInputs((link: any) => {
      const newCustomInputArr = link.slice();
      newCustomInputArr[id].value = value;
      console.log(newCustomInputArr[id].value);
      return newCustomInputArr;
    });
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

        {customProfileLinks?.map((url: CustomUrlInterface) => {
          return (
            <div key={url._id}>
              <label htmlFor="customUrlName">
                Url Name
                <input
                  type="text"
                  value={customUrlName}
                  name="customUrlName"
                  onChange={(event) => handleInputChange(event)}
                />
              </label>
              <label htmlFor="customUrlLink">
                Url Link
                <input
                  type="text"
                  name="customUrlLink"
                  value={customUrlLink}
                  onChange={(event) => handleInputChange(event)}
                />
              </label>
            </div>
          );
        })}
        {/* <button type="button" onClick={addCustomInput}>
          + Add Custom Link
        </button>

        {customInputs.map((link: any, index: any) => {
          return (
            <div key={index}>
              <label htmlFor="customUrlName">
                Url Name
                <input id={index} type={link.type} name="customUrlName" onChange={handleCustomInputChange} required />
              </label>
              <label htmlFor="customUrlLink">
                Url Link
                <input id={index} type={link.type} name="customUrlLink" onChange={handleCustomInputChange} required />
              </label>
            </div>
          );
        })} */}

        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};
