import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { UserInterface } from '../../utilities/types/UserInterface';
import { updateUser } from '../../utilities/api/users';
import './EditProfile.scss';

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [userForm, updateUserForm] = useState<UserInterface>(authUser);
  const params = useParams();
  const dispatch = useDispatch();
  const { about, first_name, last_name, portfolio_link, role } = userForm;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserForm({ ...userForm, [name]: value });
  };

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = await updateUser(params.id, userForm);
    dispatch(setAuthUser(updatedUser));
  };

  if (!authUser) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="editprofile-screen">
      <form onSubmit={handleUserUpdate}>
        <label>
          First Name
          <input type="text" name="first_name" value={first_name} onChange={(event) => handleInputChange(event)} />
        </label>

        <label>
          Last Name
          <input type="text" name="last_name" value={last_name} onChange={(event) => handleInputChange(event)} />
        </label>

        {/* <label>
          Display Name
          <input type="text" value={authUser} onChange={handleInputChange} />
        </label> */}

        <label>
          I am a DROPDOWN
          <input type="text" name="role" value={role} onChange={(event) => handleInputChange(event)} />
        </label>

        <label>
          About Me
          <textarea cols={30} rows={10}>
            {about}
          </textarea>
          {/* <textarea type="text" value={authUser} onChange={handleInputChange} /> */}
        </label>

        <label>
          Portfolio Link
          <input
            type="text"
            name="portfolio_link"
            value={portfolio_link}
            onChange={(event) => handleInputChange(event)}
          />
        </label>

        <label>
          LinkedIn Link
          <input
            type="text"
            name="linkedin"
            value={'add_linkedin_to_user_schema'}
            onChange={(event) => handleInputChange(event)}
          />
        </label>

        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};
