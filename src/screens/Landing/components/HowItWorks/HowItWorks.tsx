import React from 'react'
import howItWorksImage from 'assets/Images/ideas-into-reality-image.png'
import './HowItWorks.scss'
import { TextListItem } from '../TextListItem'

export const HowItWorks = () => {
  return (
    <div className='how-it-works'>
      <div className='text-content'>
        <div className='text-header'>How it works</div>
        <div className='text-list'>
          <TextListItem text='Sign up' />
          <TextListItem text='Tell us your role and availability for meetings' />
          <TextListItem text=' View the project prompt while Bootcampr matches you with a team based on your role and availability' />
        </div>
      </div>
      <div className='image'>
        <img src={howItWorksImage} alt='how-it-works-icon' />
      </div>
    </div>
  )
}
