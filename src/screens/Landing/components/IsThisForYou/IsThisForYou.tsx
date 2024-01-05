import React from 'react'
import isThisForYou from 'assets/Images/is-this-for-you-image.png'
import './IsThisForYou.scss'
import { TextListItem } from '../TextListItem'

export const IsThisForYou = () => {
  return (
    <div className='is-this-for-you'>
      <div className='image'>
        <img src={isThisForYou} alt='is-for-you-icon' />
      </div>
      <div className='text-content'>
        <div className='text-header'>Is this for you ?</div>
        <div className='text-list'>
          <TextListItem
            text=' You’re a UXD or SWE study program graduate'
            smallText='*SWEs should have MERN/full stack experience'
          />
          <TextListItem text='You want to sharpen the skills you’ve developed' />
          <TextListItem
            text='You want to work on a cross-functional team in a simulated work
              environment'
          />
          <TextListItem
            text="You're ready to showcase a shipped product on your portfolio to
            talk about in interviews"
          />
        </div>
      </div>
    </div>
  )
}
