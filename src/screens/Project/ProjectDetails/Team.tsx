import { ProjectDetailsSidebar } from './ProjectDetailsSidebar'
import TeamBanner from '../../../assets/Image/team-header.png'
import { TeamMemberCard } from './TeamMemberCard'
import more_vert from '../../../assets/Image/more_vert.png'

//TODO: for three dots to the Team Members banner, use an icon instead of png
//TODO: link dot icon to withdraw menu link popup
//TODO: create withdraw menu link popup
//TODO: create withdraw dialog popup

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
                <img src={more_vert} alt='three verticald dots'></img>
              </div>
            </div>
          </div>
          <div className='software-engineer-container'>
            <div className='swe-text-container'></div>
            <h1>Software Engineers</h1>
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
