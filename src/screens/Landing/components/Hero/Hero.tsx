import React from 'react'
import heroImage from 'assets/Images/hero-image.png'
import { Link } from 'react-router-dom'
import './Hero.scss'

export const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='hero-content'>
        <div className='hero-text'>
          <div className='hero-text-1'>
            <span>Join a team.</span>
            <span>Build a product.</span>
            <span>Have fun!</span>
          </div>
          <div className='hero-text-2'>
            Gain the experience you <span className='bold-text'>need</span> to
            land the job you <span className='bold-text'>want</span>.
          </div>
        </div>
        <Link to='/sign-up' className='hero-button'>
          Sign up
        </Link>
      </div>
      <div className='hero-image'>
        <img src={heroImage} alt='hero' />
      </div>
    </div>
  )
}
