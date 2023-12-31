import React from 'react'
import projectImage1 from 'assets/Images/project-image-1.png'
import projectImage2 from 'assets/Images/project-image-2.png'
import projectImage3 from 'assets/Images/project-image-3.png'
import projectImage4 from 'assets/Images/project-image-4.png'
import projectImage5 from 'assets/Images/project-image-5.png'
import './YourProjectPortal.scss'

export const YourProjectPortal = () => {
  return (
    <div className='your-project-portal'>
      <div className='header'>
        <span>Your Project Portal</span>
        <p>
          Work with your team using the tools provided to complete the project
          in 4 weeks.
        </p>
      </div>
      <div className='details'>
        <div className='details-content'>
          <div className='details-image'>
            <img src={projectImage1} alt='project-icon' />
          </div>
          <div className='details-text'>
            <div className='text-header'>Project Details</div>
            <div className='text-content'>
              The project prompt tells you the problem, user groups to consider,
              deliverables, and the scope. We provide a timeline so you know
              what to expect during the 4-week project. Focus on delivering a
              solution!
            </div>
          </div>
        </div>
        <div className='details-content'>
          <div className='details-text'>
            <div className='text-header'>Team</div>
            <div className='text-content'>
              Get to know your team of 3 software engineers and 2 UX Designers.
              View their profile to learn about them. Get links to their
              LinkedIn profile page and past work. Message your team members to
              say hi and introduce yourself!
            </div>
          </div>
          <div className='details-image'>
            <img src={projectImage2} alt='project-icon' />
          </div>
        </div>
        <div className='details-content'>
          <div className='details-image'>
            <img src={projectImage3} alt='project-icon' />
          </div>
          <div className='details-text'>
            <div className='text-header'>Calendar</div>
            <div className='text-content'>
              Communication with your team is important. We provide a calendar
              showing your full team’s availability to make it easy to schedule
              meetings. We schedule the first one for you!
            </div>
          </div>
        </div>
        <div className='details-content'>
          <div className='details-text'>
            <div className='text-header'>Task Management</div>
            <div className='text-content'>
              Most companies use a work management tool. We’ve created one you
              can use to organize and track tasks. Hiring managers will be happy
              to hear you’re familiar with task management tools!
            </div>
          </div>
          <div className='details-image'>
            <img src={projectImage4} alt='project-icon' />
          </div>
        </div>
        <div className='details-content'>
          <div className='details-image'>
            <img src={projectImage5} alt='project-icon' />
          </div>
          <div className='details-text'>
            <div className='text-header'>Submit your project!</div>
            <div className='text-content'>
              You’ve done the work and deployed your project.We’re stoked to see
              it! We give you the opportunity to present it to professional UX
              Designers, Software Engineers, and Product Managers. Use the
              feedback to present your project in interviews with confidence!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
