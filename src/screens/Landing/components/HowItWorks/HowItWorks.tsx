import React from 'react'
import howItWorksImage from 'assets/Images/ideas-into-reality-image.png'
import checkMark from 'assets/Images/checkmark.png'
import './HowItWorks.scss'

export const HowItWorks = () => {
  return (
    <div className='how-it-works'>
      <div className='text-content'>
        <div className='text-header'>How it works</div>
        <div className='text-list'>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>Sign up</span>
          </span>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>Tell us your role and availability for meetings</span>
          </span>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>
              View the project prompt while Bootcampr matches you with a team
              based on your role and availability
            </span>
          </span>
        </div>
      </div>
      <div className='image'>
        <img src={howItWorksImage} alt='how-it-works-icon' />
      </div>
    </div>
  )
}
