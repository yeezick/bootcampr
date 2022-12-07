import React from "react";
import { NavLink } from "react-router-dom";
import { GoVerified } from 'react-icons/go';
import './EmailVerify.scss';

export const EmailVerify: React.FC = () => {

  return (
    <div className="verify-container">
      <div>
        <GoVerified className="verify-icon" />
        <h2>Your Email Has Been Successfully Verified!</h2>
      </div>
      <NavLink to='/sign-in'>
        <button className="verify-btn">Sign In</button>
      </NavLink>
    </div>
  )
};