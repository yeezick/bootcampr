import React, { useState } from 'react'
import './Onboarding.scss'
import { OnboardingIncomplete } from './OnboardingIncomplete'
import { OnboardingLastScreen } from './OnboardingLastScreen'

export const Onboarding = () => {
  return (
    <div className='onboarding-container'>
      <OnboardingIncomplete />
      <OnboardingLastScreen />
    </div>
  )
}
