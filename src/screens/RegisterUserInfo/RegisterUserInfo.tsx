import { getAllUsers } from '../../utilities/api/users';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RegisterUserInfo: React.FC = () => {
  // const user = useSelector(state => state.ui)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers()
      setUser(res[0])
    }
    getUsers()
  }, [])

  const handleUpdateProfile = () => {}

  return (
    <div>
      <h3>Register User Info</h3>
      <h2>Hi, (User's name goes here)</h2>
      <form onSubmit={handleUpdateProfile}>
        <input type='text' name='first_name' placeholder='First Name' value=''></input>
        <input type='text' name='last_name' placeholder='Last Name' value=''></input>
        <textarea name='about' placeholder='About Me' value='' ></textarea>
        <input type='text' name='interested_projects' placeholder='Projects of Interest' value=''></input>
        <input type='text' name='member_of_projects' placeholder='# Of Projects' value=''></input>
        <input type='text' name='portfolio_link' placeholder='Portfolio URL' value=''></input>
        <input type='text' name='portfolio_projects' placeholder='Portfolio Projects' value=''></input>
        <input type='text' name='rejected_projects' placeholder='Rejected Projects' value=''></input>
        <input type='text' name='role' placeholder='Role/Position' value=''></input>
        <button>Save Profile</button>
      </form>
    </div>
  )
};

export default RegisterUserInfo;