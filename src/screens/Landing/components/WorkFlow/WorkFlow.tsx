import React from 'react'
import buildImage from 'assets/Images/buildImage.png'
import gainImage from 'assets/Images/gainImage.png'
import joinImage from 'assets/Images/joinImage.png'
import './WorkFlow.scss'
import { WorkFlowItem } from './WorkFlowItem'

export const WorkFlow = () => {
  return (
    <div className='team-workflow'>
      <WorkFlowItem
        imagePath={buildImage}
        altText='build-icon'
        subtitle='Build a product'
        actualText="Apply what you've learned"
      />
      <WorkFlowItem
        imagePath={gainImage}
        altText='gain-icon'
        subtitle='Gain experience'
        actualText='Workplace-simulated environment'
      />
      <WorkFlowItem
        imagePath={joinImage}
        altText='join-icon'
        subtitle='Join a team'
        actualText='Hiring managers look for soft skills'
      />
    </div>
  )
}
