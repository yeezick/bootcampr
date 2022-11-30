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
  const [profileImageFile, setProfileImageFile] = useState<AddImageInterface | null>();
  const [previewImage, setPreviewImage] = useState();

  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role } = userForm;

  useEffect(() => {
    if (authUser.role) {
      navigate(`/users/${authUser._id}/edit`);
    }
    if (authUser) {
      setUserForm({ ...authUser });
    }
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (profileImageFile) await createUserImage(profileImageFile, authUser._id);

    dispatch(updateProfile(userForm));
    navigate(`/users/${authUser._id}`);
  };

  return (
    <div className="acct-setup-page">
      <h1>Hi, {firstName}!</h1>
      <div className="form-container">
        <section className="profile-photo-grid">
          {previewImage ? (
            <div className="profile-photo">
              <img src={previewImage} alt="photo" />
            </div>
          ) : (
            <div className="profile-photo">
              <img src={authUser.profilePicture} alt="photo" />
            </div>
          )}
          <label>Profile Photo:</label>
          <AddUserProfileImage
            setProfileImageFile={setProfileImageFile}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            profileImageFile={profileImageFile}
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
