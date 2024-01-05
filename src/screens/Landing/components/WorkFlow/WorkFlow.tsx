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
        text1='Build a product'
        text2="Apply what you've learned"
      />
      <WorkFlowItem
        imagePath={gainImage}
        altText='gain-icon'
        text1='Gain experience'
        text2='Workplace-simulated environment'
      />
      <WorkFlowItem
        imagePath={joinImage}
        altText='join-icon'
        text1='Join a team'
        text2='Hiring managers look for soft skills'
      />
    </div>
  )
}
