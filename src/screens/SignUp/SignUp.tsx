import React,{ useState } from "react";
import { SignUpInterface } from "../../utilities/Interface/SignUpInterface";

const SignUp: React.FC = () => {
  const [signUp, setSignUp ] = useState<SignUpInterface>()

  const handleChange= (e) =>{
    
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return ( 
  <>
    <div> 
      <form >
        <input type="text" name="email" placeholder="Email"  onChange={handleChange}/>
        <input type="text" name="first_name" placeholder="First Name"    onChange={handleChange}/>
        <input type="text" name="last_name" placeholder="Last Name"   onChange={handleChange}/>
        <input type="text" name="password" placeholder="Password"  onChange={handleChange} />
        <input type="text" name="confirmPassword" placeholder="Confirm Password"  onChange={handleChange}/>
        <button type="submit"> sign up</button>
      </form>
    </div>
  </>)
};

export default SignUp;
