import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUser } from '../../utilities/api/users';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { UserInterface } from '../../utilities/types/UserInterface';
import { useParams } from 'react-router-dom';

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser);
  const [userForm, updateUserForm] = useState<UserInterface | null>(authUser);
  const params = useParams();

  // useEffect(() => {
  //   updateUserForm(authUser)
  // }, [authUser])

  console.log('edtUSer:', authUser);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('e:', e);
    // updateUserForm((state) => {
    //   return {...state,  }
    // })
  };

  const handleUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('params', params);
    const updatedUser = await updateUser(params.id, userForm);
  };

  if (!authUser) {
    return <div>Loading user...</div>;
  }
  const { about, first_name, last_name, portfolio_link, role } = authUser;

  return (
    <div>
      <form onSubmit={handleUserUpdate}>
        <label>
          First Name
          <input type="text" value={first_name} onChange={handleInputChange} />
        </label>

        <label>
          Last Name
          <input type="text" value={last_name} onChange={handleInputChange} />
        </label>

        {/* <label>
          Display Name
          <input type="text" value={authUser} onChange={handleInputChange} />
        </label> */}

        <label>
          I am a DROPDOWN
          <input type="text" value={role} onChange={handleInputChange} />
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
          <input type="text" value={portfolio_link} onChange={handleInputChange} />
        </label>

        <label>
          LinkedIn Link
          <input type="text" value={'linkedin.com'} onChange={handleInputChange} />
        </label>

        <button type="submit">Update Info</button>
      </form>
    </div>
  );
};
