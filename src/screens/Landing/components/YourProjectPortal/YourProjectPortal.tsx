import laptopProjectDetails from 'assets/Images/laptop-project-details.png'
import laptopTeam from 'assets/Images/laptop-team.png'
import laptopCalendar from 'assets/Images/laptop-calendar.png'
import laptopTaskManagement from 'assets/Images/laptop-task-management.png'
import laptopSubmitProject from 'assets/Images/laptop-submit-project.png'
import './YourProjectPortal.scss'
import { DetailsContent } from './DetailsContent'

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
        <DetailsContent
          imagePath={laptopProjectDetails}
          textHeader='Project Details'
          textContent=' The project prompt tells you the problem, user groups to consider, deliverables, and the scope. We provide a timeline so you know what to expect during the 4-week project. Focus on delivering a solution!'
        />
        <DetailsContent
          imagePath={laptopTeam}
          textHeader='Team'
          textContent=' Get to know your team of 3 software engineers and 2 UX Designers. View their profile to learn about them. Get links to their LinkedIn profile page and past work. Message your team members to say hi and introduce yourself!'
        />
        <DetailsContent
          imagePath={laptopCalendar}
          textHeader='Calendar'
          textContent=' Communication with your team is important. We provide a calendar showing your full team availability to make it easy to schedule meetings. We schedule the first one for you!'
        />
        <DetailsContent
          imagePath={laptopTaskManagement}
          textHeader='Task Management'
          textContent='Most companies use a work management tool. We’ve created one you can use to organize and track tasks. Hiring managers will be happy to hear you’re familiar with task management tools!'
        />
        <DetailsContent
          imagePath={laptopSubmitProject}
          textHeader='Submit your project!'
          textContent='You’ve done the work and deployed your project.
          We’re stoked to see it! We give you the opportunity to present it to professional UX Designers, Software Engineers, and Product Managers. Use the feedback to present your project in interviews with confidence!'
        />
      </div>
    </div>
  )
}
