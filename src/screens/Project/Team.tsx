import './Team.scss'
import TeamBanner from '../../assets/Images/team-banner.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const Team = () => {
  return (
    <>
      <div className='team-container'>
        <div className='page-container'>
          <div className='header-container'>
            <img src={TeamBanner} alt='man working on computer'></img>
          </div>
          <div className='banner-box-container'>
            <div className='banner-text-container'>
              <div className='banner-text'>
                <h1>Team Members</h1>
                <BsThreeDotsVertical size={24} />
              </div>
            </div>
          </div>
          <div className='software-engineer-container'>
            <div className='swe-text-container'></div>
            <h1>Software Engineers</h1>
            <TeamMemberCard />
          </div>
          <div className='ux-designers-container'>
            <div className='ux-designers-text-container'></div>
            <h1>UX Designers</h1>
          </div>
          <div>
            <TeamMemberCard />
          </div>
        </div>
      </div>
    </>
  )
}
