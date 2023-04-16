import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'assets/Logo.svg'
import './Footer.scss'

export const Footer: React.FC = () => {
  return (
    <div className='footer-container'>
      <Link className='link' to='/'>
        <img src={Logo} />
      </Link>
      <Link className='link' to='/sign-up'>
        Register Today!
      </Link>
      <Link className='link' to='/sign-in'>
        Alreay have an account? Sign In
      </Link>
      <p>© 2023 Bootcampr, Inc</p>
    </div>
  )
}
