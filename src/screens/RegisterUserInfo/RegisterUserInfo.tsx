import { getAllUsers, updateUser } from '../../utilities/api/users';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RegisterUserInfo: React.FC = () => {
  // const user = useSelector(state => state.ui)
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({})
  const initialState = {
    first_name: '',
    last_name: '',
    about: '',
    interested_projects: '',
    member_of_projects: '',
    portfolio_link: '',
    port:''
  }

  function handleChange (e: any){
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers()
      setUser(res[0])
      console.log('RESPONSE', user)
      console.log('USER ID', user._id)
    }
    getUsers()
  }, [])

  const handleUpdateProfile =  (e: any) => {
    e.preventDefault()
    updateUser(user._id ,{...formData})
    // const 
  }

  return (
    <div>
      <h3>Register User Info</h3>
      <h2>Hi, (User's name goes here)</h2>
      <form onSubmit={handleUpdateProfile}>
        <input type='text' name='first_name' placeholder='First Name' value='' onChange={handleChange}/>
        <input type='text' name='last_name' placeholder='Last Name' value=''  onChange={handleChange}/>
        <textarea name='about' placeholder='About Me' value=''   onChange={handleChange}/>
        <input type='text' name='member_of_projects' placeholder='# Of Projects' value='' onChange={handleChange}/>
        <input type='text' name='portfolio_link' placeholder='Portfolio URL' value=''onChange={handleChange}/>
        <input type='text' name='portfolio_projects' placeholder='Portfolio Projects' value='' onChange={handleChange}/>
        <input type='text' name='rejected_projects' placeholder='Rejected Projects' value='' onChange={handleChange}/>
        <input type='text' name='role' placeholder='Role/Position' value=' onChange={handleChange}'/>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  )
};

export default RegisterUserInfo;