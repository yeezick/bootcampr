import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import './Presentation.scss'

export const Presentation = () => {
  return (
    <div className='presentation'>
      <div className='pre_text_cont'>
        <div className='pre_detail_cont'>
          <div className='pre_header_cont'>
            <h1>Project Presentation</h1>
          </div>
          <div className='pre_description_cont'>
            <div className='pre_icons_cont'>
              <div className='pre_icon_content'>
                <CalendarMonthOutlinedIcon className='pre_icon' />
                <p>Sep 1, 2023 | 12:00pm - 2:00pm PST</p>
              </div>
              <div className='pre_icon_content'>
                <AccessTimeOutlinedIcon className='pre_icon' />
                <p>15 min presentation</p>
              </div>
              <div className='pre_icon_content'>
                <VideocamOutlinedIcon className='pre_icon' />
                <p>Meeting detail will be provided upon confirmation</p>
              </div>
            </div>
            <div className='pre_para_content'>
              <p>
                Present your team’s work to professional Product Managers, UX
                Designers, and Software Engineers.
              </p>
            </div>
          </div>
        </div>
        <div className='pre_para_decision_cont'>
          <div className='pre_para_decision'>
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
          <div className='pre_para_decision'>
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
          <div className='pre_para_decision'>
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
