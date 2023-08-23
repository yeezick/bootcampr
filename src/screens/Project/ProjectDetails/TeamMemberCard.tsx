import './ProjectDetails.scss'
import Ellipse58 from '../../../assets/Image/Ellipse58.png'

//TODO: fix profile img container to correct spot

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
