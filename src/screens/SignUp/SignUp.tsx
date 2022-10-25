import React,{ useState } from "react";
import { SignUpInterface } from "../../utilities/Interface/SignUpInterface";

const SignUp: React.FC = () => {
  const [signUp, setSignUp ] = useState<SignUpInterface>()
  
  return( <>
  <div> 
    <form>
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="first_name" placeholder="First Name" />
      <input type="text" name="last_name" placeholder="Last Name" />
      <input type="text" name="password" placeholder="Password" />
      <input type="text" name="confirmPassword" placeholder="Confirm Password"/>
    </form>
  </div>
  </>)
};

export default SignUp;
