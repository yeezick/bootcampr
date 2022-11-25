import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { selectAuthUser, updateProfile } from '../../utilities/redux/slices/users/userSlice';
import { AddImageInterface, UserInterface } from '../../utilities/types/UserInterface';
import { useEffect, useState } from 'react';
import './RegisterUserInfo.scss';
import { emptyUser } from '../../utilities/data/userConstants';
import { createUserImage } from '../../utilities/api/users';
import AddUserProfileImage from '../SignUp/AddUserProfileImage/AddUserProfileImage';

export const RegisterUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const [userForm, setUserForm] = useState<UserInterface>(emptyUser);
  const [imageFile, setImageName] = useState<string>();
  const [profileImageFile, setProfileImageFile] = useState<AddImageInterface>();

  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role } = userForm;

  useEffect(() => {
    if (authUser.role) {
      navigate(`/users/${authUser._id}/edit`);
    }
    if (authUser) {
      setUserForm({ ...authUser });
    }
  }, [authUser]);

  useEffect(() => {
    // const api = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=E53333`;
    const api = `https://ui-avatars.com/api/?name=zena+Ariel&background=E53333`;
    const createDefaultImage = async () => {
      const imageApiName = await fetch(api);
      setImageName(imageApiName.url);
    };
    createDefaultImage();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profileImageFile) createUserImage(profileImageFile, authUser._id);
    dispatch(updateProfile(userForm));
    navigate(`/users/${authUser._id}`);
  };

  return (
    <div className="acct-setup-page">
      <h1>Hi, {firstName}!</h1>
      <div className="form-container">
        <section className="profile-photo-grid">
          <div className="profile-photo">
            <img
              src={
                !profilePicture
                  ? `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=E53333`
                  : profilePicture
              }
              alt="photo"
            />
          </div>
          <label>Profile Photo:</label>
          <AddUserProfileImage setProfileImageFile={setProfileImageFile} />
          <input
            onChange={handleChange}
            type="text"
            name="profilePicture"
            placeholder="Profile Photo"
            value={profilePicture}
          />
        </section>

        <div className="user-info-grid">
          <h2>Set Up Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label>First Name:</label>
              <input onChange={handleChange} type="text" name="firstName" placeholder="First Name" value={firstName} />
            </div>

            <div className="form-input">
              <label>Last Name:</label>
              <input onChange={handleChange} type="text" name="lastName" placeholder="Last Name" value={lastName} />
            </div>

            <div className="form-input">
              <label>About Me:</label>
              <input onChange={handleChange} type="text" name="bio" placeholder="About Me" value={bio} />
            </div>

            <div className="form-input">
              <label>My Role:</label>
              <input onChange={handleChange} type="text" name="role" placeholder="My Role" value={role} required />
            </div>

            <h2>Socials:</h2>
            <div className="form-input">
              <label>LinkedIn URL:</label>
              <input
                onChange={handleChange}
                type="text"
                name="linkedinUrl"
                placeholder="LinkedIn URL"
                value={linkedinUrl}
              />
            </div>

            <div className="form-input">
              <label>Portfolio URL:</label>
              <input
                onChange={handleChange}
                type="text"
                name="portfolioUrl"
                placeholder="Portfolio URL"
                value={portfolioUrl}
              />
            </div>

            <div className="form-btn">
              <button type="submit">Submit Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
