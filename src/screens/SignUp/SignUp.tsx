import { register, reset, uiStatus } from "../../utilities/redux/slices/users/userSlice";
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInterface } from "../../utilities/types/UserInterface";
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import './SignUp.scss'


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const status = useAppSelector(uiStatus)
  const { _id } = useAppSelector((state) => state.ui.auth.user)

  const [inputType, setInputType] = useState('password')
  const [formValues, setFormValues ] = useState<SignUpInterface>({
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  })

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset())
      setFormValues({
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      })
      navigate(`/users/${_id}/account-setup`)
    }
  }, [status.isSuccess, dispatch])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(register(formValues))
  }
  
  const validateForm = () => {
    for (const [key, value] of Object.entries(formValues)) {
      if (!value || (formValues.password !== formValues.confirmPassword)) {
        return true
      }
    }
  }
  
  const DoPasswordsMatch = () => {
    if (formValues.password && formValues.confirmPassword) {
      if (formValues.password !== formValues.confirmPassword) {
        return <h4 className='pwd-mismatch'>Passwords do not match</h4>
      } else {
        return <h4 className='pwd-match'>Passwords match!</h4>
      }
    }
  }
  
  const passwordReveal = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password')
  }
  
  return (
    <div className="signup-container">
      <h3>User Register</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-input">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="First Name"  onChange={handleChange} value={formValues.firstName} autoComplete="off" required />
        </div>
        <div className="form-input">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formValues.lastName} autoComplete="off" required />
        </div>
        <div className="form-input">
          <label>Email</label>
          <input type="email" name="email" placeholder="Email"  onChange={handleChange} value={formValues.email} autoComplete="off" required />
        </div>
        <div className="pwd-input">
          <div>
            <label>Password</label>
            {inputType === 'password' ? <BsEyeSlash onClick={passwordReveal} className='pwd-reveal-gray' /> : <BsEyeFill onClick={passwordReveal} className='pwd-reveal' />}
            <input type={inputType} name="password" placeholder="Password" onChange={handleChange} value={formValues.password} autoComplete="off" />
          </div>
        </div>
        <div className="form-input">
          <label>Confirm Password</label>
          <input type={inputType} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formValues.confirmPassword}  autoComplete="off" />
        </div>
        <div className="form-btn">
          <button type="submit" disabled={validateForm()}>Create Account</button>
        </div>
      </form>
      {DoPasswordsMatch()}
    </div>
  )
}

export default SignUp;