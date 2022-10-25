import { signUp } from "../../utilities/api/users";
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpInterface } from "../../utilities/Interface/SignUpInterface";

const SignUp: React.FC = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues ] = useState<SignUpInterface>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange= (e:any) =>  {
      setFormValues({...formValues, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e:any) => {
    e.preventDefault()

    await signUp({
      email: formValues.email,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      password: formValues.password,
    })

    setFormValues({
      email:"",
      first_name: "",
      last_name:"",
      password:"",
      confirmPassword:""
    })

    navigate('/sign-in')
  
  }
  
  const isFormValid = () => {
    return (!formValues.email || !formValues.first_name || !formValues.last_name || !formValues.password || !formValues.confirmPassword || formValues.password !== formValues.confirmPassword)
  }

  return ( 
  <>
    <div> 
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="email" name="email" placeholder="Email"  onChange={handleChange} value={formValues.email}   autoComplete="off"/>
        <input type="text" name="first_name" placeholder="First Name"  onChange={handleChange} value={formValues.first_name}  autoComplete="off" />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} value={formValues.last_name}   autoComplete="off"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formValues.password}   autoComplete="off"/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password"  onChange={handleChange} value={formValues.confirmPassword}  autoComplete="off"/>
        <button type="submit" disabled={isFormValid()}>Create Account</button>
      </form>
      {(formValues.password && formValues.confirmPassword) && formValues.password !== formValues.confirmPassword ? <h4 style={{color: 'red'}}>Passwords do not match</h4> : null}
    </div>
  </>)
};

export default SignUp;
