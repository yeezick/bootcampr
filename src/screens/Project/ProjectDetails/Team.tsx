import { ProjectDetailsSidebar } from './ProjectDetailsSidebar'
import TeamBanner from '../../../assets/Image/team-header.png'
import { TeamMemberCard } from './TeamMemberCard'
import { BsThreeDotsVertical } from 'react-icons/bs'

//TODO: link dot icon to withdraw menu link popup
//TODO: create withdraw menu link popup
//TODO: create withdraw dialog popup
//TODO: how to map users based on role (SWE and UX)
//TODO: how to display user card without message button

export const Team = () => {
  return (
    <>
      <div className='team-container'>
        <ProjectDetailsSidebar />
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
        </div>
      </div>
    </>
  )
}
