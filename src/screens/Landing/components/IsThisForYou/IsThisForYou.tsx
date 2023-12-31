import React from 'react'
import checkMark from 'assets/Images/checkmark.png'
import isThisForYou from 'assets/Images/is-this-for-you-image.png'
import './IsThisForYou.scss'

export const IsThisForYou = () => {
  return (
    <div className='is-this-for-you'>
      <div className='image'>
        <img src={isThisForYou} alt='is-for-you-icon' />
      </div>
      <div className='text-content'>
        <div className='text-header'>Is this for you ?</div>
        <div className='text-list'>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>
              You’re a UXD or SWE study program graduate
              <small>
                <b>*SWEs should have MERN/full stack experience</b>
              </small>
            </span>
          </span>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>You want to sharpen the skills you’ve developed </span>
          </span>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>
              You want to work on a cross-functional team in a simulated work
              environment
            </span>
          </span>
          <span className='text-list-item'>
            <img src={checkMark} alt='checkmark' />
            <span>
              You're ready to showcase a shipped product on your portfolio to
              talk about in interviews
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
