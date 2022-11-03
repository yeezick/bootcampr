import { register, reset } from "../../utilities/redux/slices/users/userSlice";
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInterface } from "../../utilities/types/UserInterface";
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { FaSpinner } from 'react-icons/fa'
import './SignUp.scss'


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoading, isSuccess } = useAppSelector((state) => state.ui.status)
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
    if (isSuccess) {
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
  }, [isSuccess, dispatch])
  
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

  if (isLoading)
    return (
      <div className="loading-status">
        <FaSpinner className="loading-icon" />
        <h3>Bootcamper</h3>
      </div>
    )
  
  return (
    <div className="signup-container">
      <h3>User Register</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="firstName" placeholder="First Name"  onChange={handleChange} value={formValues.firstName} autoComplete="off" required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formValues.lastName} autoComplete="off" required />
        <input type="email" name="email" placeholder="Email"  onChange={handleChange} value={formValues.email} autoComplete="off" required />
        <div>
          {inputType === 'password' ? <BsEyeSlash onClick={passwordReveal} className='pwd-reveal-gray' /> : <BsEyeFill onClick={passwordReveal} className='pwd-reveal' />}
          <input type={inputType} name="password" placeholder="Password" onChange={handleChange} value={formValues.password} autoComplete="off" />
        </div>
        <input type={inputType} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formValues.confirmPassword}  autoComplete="off"/>
        <button type="submit" disabled={validateForm()}>Create Account</button>
      </form>
      {DoPasswordsMatch()}
    </div>
  )
}

export default SignUp;