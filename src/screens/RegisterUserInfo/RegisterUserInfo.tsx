import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { reset, selectAuthUser, uiStatus, updateProfile } from '../../utilities/redux/slices/users/userSlice';
import { UserInterface } from '../../utilities/types/UserInterface';
import { useEffect, useState } from 'react';
import { emptyUser } from '../../utilities/data/userConstants';
import { GoVerified } from 'react-icons/go'
import './RegisterUserInfo.scss';

export const RegisterUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(uiStatus);
  const authUser = useAppSelector(selectAuthUser);
  const [userForm, setUserForm] = useState<UserInterface>(emptyUser);
  const [alertBanner, setAlertBanner] = useState(false)
  const { bio, firstName, githubUrl, lastName, linkedinUrl, portfolioUrl, profilePicture, role } = userForm;

  useEffect(() => {
    if (authUser.role) {
      navigate(`/users/${authUser._id}/edit`);
    }
    if (authUser) {
      setAlertBanner(true);
      setUserForm((currForm) => {
        return { ...currForm, ...authUser };
      });

      setTimeout(() => {
        setAlertBanner(false)
      }, 15000);
    }
  }, [authUser]);

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset());
      navigate(`/users/${authUser._id}`);
    }
  }, [status.isSuccess, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(userForm));
  };

  return (
    <div className="acct-setup-page">
      {alertBanner ? (
          <div className='alert-banner-verified'>
            <GoVerified />
            <p>Your Email Has Been Successfully Verified!</p>
          </div>
        ) : null
      }
      <h1>Hi, {firstName}!</h1>
      <div className="form-container">
        <section className="profile-photo-grid">
          <div className="profile-photo">
            <img
              src={
                !profilePicture
                  ? 'https://pbs.twimg.com/profile_images/1564398871996174336/M-hffw5a_400x400.jpg'
                  : profilePicture
              }
              alt="photo"
            />
          </div>
          <label>Profile Photo:</label>
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
              <select name="role" onChange={handleChange}>
                <option value="0"></option>
                <option value="UX Designer">UX Designer</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
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

            {userForm.role === 'Software Engineer' && (
              <div className="form-input">
                <label>Github URL:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="githubUrl"
                  placeholder="Github URL"
                  value={githubUrl}
                />
              </div>
            )}

            <div className="form-btn">
              <button type="submit">Submit Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
