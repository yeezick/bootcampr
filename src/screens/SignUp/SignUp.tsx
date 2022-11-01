import { signUp } from "../../utilities/api/users";
import { register, reset } from "../../utilities/redux/slices/users/authSlice";
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInterface } from "../../utilities/Interface/SignUpInterface";
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import './SignUp.css'


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoading, isSuccess } = useAppSelector((state) => state.auth)

  const [inputType, setInputType] = useState('password')
  const [pwdRevealIcon, setPwdRevealIcon] = useState('https://i.postimg.cc/zGQTSGmF/pngwing-com-1.png')
  const [formValues, setFormValues ] = useState<SignUpInterface>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
      setFormValues({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: ""
      })
      navigate('/sign-in')
    }
  }, [isSuccess, dispatch])
  
  const handleChange= (e: any) =>  {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    // const newUser: SignUpInterface = (formValues)

    dispatch(register(formValues))
    // await signUp(formValues)
  }
  
  const isFormValid = () => {
    return (!formValues.email || !formValues.first_name || !formValues.last_name || !formValues.password || !formValues.confirmPassword || formValues.password !== formValues.confirmPassword)
  }
  
  const DoPasswordsMatch = () => {
    if (formValues.password && formValues.confirmPassword) {
      if (formValues.password !== formValues.confirmPassword) {
        return <h4 id='pwd-mismatch'>Passwords do not match</h4>
      } else {
        return <h4 id='pwd-match'>Passwords match!</h4>
      }
    }
  }
  
  const passwordReveal = () => {
    if (inputType === 'password' && pwdRevealIcon === 'https://i.postimg.cc/zGQTSGmF/pngwing-com-1.png') {
      setInputType('text')
      setPwdRevealIcon('https://i.postimg.cc/CLt33bby/pngwing-com.png')
    } else {
      setInputType('password')
      setPwdRevealIcon('https://i.postimg.cc/zGQTSGmF/pngwing-com-1.png')
    }
  }

  if (isLoading)
    return <h1 style={{color: 'orange'}}>Loading... ...</h1>
  
  return (
    <div className="signup-container">
      <h3>User Register</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="first_name" placeholder="First Name"  onChange={handleChange} value={formValues.first_name} autoComplete="off" />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} value={formValues.last_name} autoComplete="off"/>
        <input type="email" name="email" placeholder="Email"  onChange={handleChange} value={formValues.email} autoComplete="off" required />
        <div>
          <img onClick={passwordReveal} src={pwdRevealIcon} alt='pwd' id={inputType === 'password' ? 'pwd-reveal-gray' : 'pwd-reveal'} />
          <input type={inputType} name="password" placeholder="Password" onChange={handleChange} value={formValues.password} autoComplete="off" />
        </div>
        <input type={inputType} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formValues.confirmPassword}  autoComplete="off"/>
        <button type="submit" disabled={isFormValid()}>Create Account</button>
      </form>
      {DoPasswordsMatch()}
    </div>
  )
};

export default SignUp;