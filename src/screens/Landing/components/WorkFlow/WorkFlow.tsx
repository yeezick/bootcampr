import React from 'react'
import buildImage from 'assets/Images/buildImage.png'
import gainImage from 'assets/Images/gainImage.png'
import joinImage from 'assets/Images/joinImage.png'
import './WorkFlow.scss'

export const WorkFlow = () => {
  return (
    <div className='team-workflow'>
      <div className='workflow'>
        <img src={buildImage} alt='build-icon' />
        <div className='text'>
          <span>Build a product</span>
          <p>Apply what you've learned</p>
        </div>
      </div>
      <div className='workflow'>
        <img src={gainImage} alt='gain-icon' />
        <div className='text'>
          <span>Gain experience</span>
          <p>Workplace-simulated environment</p>
        </div>
      </div>
      <div className='workflow'>
        <img src={joinImage} alt='join-icon' />
        <div className='text'>
          <span>Join a team</span>
          <p>Hiring managers look for soft skills</p>
        </div>
      </div>
    </div>
  )
}
