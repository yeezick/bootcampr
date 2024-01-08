import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'assets/Logo.svg'
import './Footer.scss'
import { useAppSelector } from 'utils/redux/hooks'

export const Footer: React.FC = () => {
  const userId = useAppSelector(state => state.ui.auth.user._id)

  return (
    <div className='footer-container'>
      <Link className='link' to='/'>
        <img src={Logo} alt='logo' />
      </Link>
      <Link className='link' to='/sign-up'>
        Register Today!
      </Link>
      <Link className='link' to='/sign-in'>
        Already have an account? Sign In
      </Link>
      <p>© 2023 Bootcampr, Inc</p>
    </div>
  )
}
