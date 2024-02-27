import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Landing.scss'
import { ContactForm } from './components/ContactForm/ContactForm'
import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { YourProjectPortal } from './components/YourProjectPortal/YourProjectPortal'
import { IsThisForYou } from './components/IsThisForYou/IsThisForYou'
import { WorkFlow } from './components/WorkFlow/WorkFlow'

export const Landing: React.FC = () => {
  const env = process.env.REACT_APP_API_ENV

  useEffect(() => {
    if (env !== 'dev') {
      window.location.replace('https://landing.bootcampr.io/')
    }
  }, [env])

  return (
    <div className='landing-container'>
      <Hero />
      <div className='teaser-container'>
        <div className='teaser-header'>UX Designers & Software Engineers</div>
        <div className='teaser-text'>
          <div className='teaser-text-1'>
            You just finished a boot camp-- <br />
            but to get experience in the “real world” you need...experience.
          </div>
          <div className='teaser-text-2'>Now what?</div>
          <div className='teaser-text-3'>
            Connect with fellow boot camp grads to complete and ship a product.{' '}
            <br />
            Gain experience working on a cross-functional team to get hired
            faster.
          </div>
        </div>
      </div>
      <section>
        <HowItWorks />
        <YourProjectPortal />
        <IsThisForYou />
        <WorkFlow />
      </section>
      <div className='get-job'>
        <span>You've done the work.</span>
        <span>Get the job.</span>
        <Link
          className='button'
          to='/sign-up'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sign up
        </Link>
      </div>
      <ContactForm />
    </div>
  )
}
