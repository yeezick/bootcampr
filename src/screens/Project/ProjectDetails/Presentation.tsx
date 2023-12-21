import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import './Presentation.scss'

export const Presentation = () => {
  return (
    <div className='presentation'>
      <div className='pre-text-cont'>
        <div className='pre-detail-cont'>
          <div className='pre-header-cont'>
            <h1>Project Presentation</h1>
          </div>
          <div className='pre-description-cont'>
            <div className='pre-icons-cont'>
              <div className='pre-icon-content'>
                <CalendarMonthOutlinedIcon className='pre-icon' />
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='pre-icon-content'>
                <AccessTimeOutlinedIcon className='pre-icon' />
                <p>15 min presentation</p>
              </div>
              <div className='pre-icon-content'>
                <VideocamOutlinedIcon className='pre-icon' />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </div>
            <div className='pre-para-content'>
              <p>
                Present your team’s work to professional Product Managers, UX
                Designers, and Software Engineers.
              </p>
            </div>
          </div>
        </div>
        <div className='pre-para-decision-cont'>
          <div className='pre-para-decision'>
            <h3>Why present your project?</h3>
            <ul>
              <li>
                Hone your presentation skills in front of the Bootcampr product
                team.
              </li>
              <li>
                Get feedback from people with experience launching a new
                product.
              </li>
              <li>Identify room for improvements.</li>
              <li>
                Use the feedback you receive to present your work in interviews
                with confidence!
              </li>
            </ul>
          </div>
          <div className='pre-para-decision'>
            <h3>Who is presenting your project?</h3>
            <ul>
              <li>
                At least one person must participate to present team’s work.
              </li>
              <li>
                Participation by all team members is not required but
                encouraged.
              </li>
            </ul>
          </div>
          <div className='pre-para-decision'>
            <h3>
              Let us know if your team is presenting when you submit your
              project!
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
