import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { reset, selectAuthUser, uiStatus, updateProfile } from '../../utilities/redux/slices/users/userSlice';
import { UserInterface } from '../../utilities/types/UserInterface';
import { useEffect, useState } from 'react';
import { emptyUser } from '../../utilities/data/userConstants';
import { createUserImage } from '../../utilities/api/users';
import AddUserProfileImage from '../SignUp/AddUserProfileImage/AddUserProfileImage';
import './RegisterUserInfo.scss';
import { PreviewsUserImage } from '../PreviewsUserImage/PreviewsUserImage';

export const RegisterUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(uiStatus);
  const authUser = useAppSelector(selectAuthUser);
  const [userForm, setUserForm] = useState<UserInterface>(emptyUser);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();

  const { bio, firstName, lastName, linkedinUrl, portfolioUrl, profilePicture, role } = userForm;

  useEffect(() => {
    if (authUser.role) {
      navigate(`/users/${authUser._id}/edit`);
    }
    if (authUser) {
      setUserForm((currForm) => {
        return { ...currForm, ...authUser };
      });
    }
  }, [authUser]);

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset());
      navigate(`/users/${authUser._id}`);
    }
  }, [status.isSuccess, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (profileImageFile) await createUserImage(profileImageFile, authUser._id);

    dispatch(updateProfile(userForm));
  };

  return (
    <div className="acct-setup-page">
      <h1>Hi, {firstName}!</h1>
      <div className="form-container">
        <section className="profile-photo-grid">
          <PreviewsUserImage previewImage={previewImage} authUser={{ profilePicture: profilePicture }} />
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
