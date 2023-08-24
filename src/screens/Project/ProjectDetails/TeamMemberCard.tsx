import './ProjectDetails.scss'
import Ellipse58 from '../../../assets/Image/Ellipse58.png'

//TODO: create proper image ellipse,
//TODO make team member card true to figma,
//TODO profile data functionality and how to link it to project,
//TODO style buttons,
//TODO link profile button to profile popup,
//TODO link message to chat popup

export const TeamMemberCard = () => {
  return (
    <>
      <h1> Team Member Card </h1>
      <div className='profile-container'>
        <div className='profile-img-container'>
          <img className='profile-img' src={Ellipse58} alt='man'></img>
        </div>
        <div className='profile-info'></div>
        <div className='profile-name'></div>
        <label>Carter Young</label>
        <div className='profile-role'></div>
        <p>Software Engineer</p>
        <div className='profile-buttons'></div>
        <div className='profile-btn'>
          <button>Profile</button>
        </div>
        <div className='message-btn'>
          <button>Message</button>
        </div>
      </div>
    </>
  )
}
