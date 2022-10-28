import { signUp } from "../../utilities/api/users";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpInterface } from "../../utilities/Interface/SignUpInterface";
import './SignUp.css'
import { RootState } from "../../utilities/redux/store";
import { authSlice, register } from "../../utilities/redux/slices/users/authSlice";


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isSuccess } = useSelector((state) => state.auth)

  const [inputType, setInputType] = useState('password')
  const [pwdRevealIcon, setPwdRevealIcon] = useState('https://i.postimg.cc/zGQTSGmF/pngwing-com-1.png')
  const [formValues, setFormValues ] = useState<SignUpInterface>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: ""
  })
  
  const handleChange= (e: any) =>  {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    const newUser: SignUpInterface = (formValues)

    dispatch(register(newUser))
    // await signUp(formValues)
  
    setFormValues({
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: ""
    })
  
    navigate('/sign-in')
  }
  
  const isFormValid = () => {
    return (!formValues.email || !formValues.first_name || !formValues.last_name || !formValues.password || !formValues.confirmPassword || formValues.password !== formValues.confirmPassword)
  }
  
  const doPasswordsMatch = () => {
    if ((formValues.password && formValues.confirmPassword) && formValues.password !== formValues.confirmPassword) {
      return <h4 style={{color: 'red'}}>Passwords do not match</h4>
    }
  
    if ((formValues.password && formValues.confirmPassword) && formValues.password === formValues.confirmPassword) {
      return <h4 style={{color: 'rgb(48, 161, 192)'}}>Passwords match!</h4>
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
  
  return (
  <>
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
      {doPasswordsMatch()}
    </div>
  </>)
};

export default SignUp;